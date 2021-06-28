import { RefObject, useContext, useEffect, useRef } from "react";
import * as Three from "three"
import { AmplitudeEnvelope, Analyser, Meter } from "tone";
import { complement, isNil } from "ramda";
import { TransportProvider } from "../../providers";
import { fragmentShader, vertexShader } from "./shaders";
import gsap from "gsap";
import { ConfigType } from "../../providers/transportProvider/transportProvider.types";

export const useRenderer = (mount: RefObject<HTMLElement>) => {
	const {
		isPlaying,
		bpm,
		envelopeRef,
		analyserRef,
		meterRef,
		config: synthConfig,
		currentBeatNotes
	} = useContext(TransportProvider.Context);

	const analyser = useRef<Analyser>();
	const meter = useRef<Meter>();
	const envelope = useRef<AmplitudeEnvelope>();
	const config = useRef<{
		isPlaying: number;
		bpm: number;
		zoom: number;
	} & ConfigType>({
		isPlaying: Number(isPlaying),
		bpm,
		zoom: 5,
		...synthConfig
	});
	const materialRef = useRef<Three.ShaderMaterial>();

	useEffect(() => {
		if (meter.current) return;
		meter.current = meterRef;
	}, [meterRef])

	useEffect(() => {
		if (analyser.current) return;
		analyser.current = analyserRef;
	}, [analyserRef])

	useEffect(() => {
		if (envelope.current) return;
		envelope.current = envelopeRef;
	}, [envelopeRef])


	useEffect(() => {
		if (!mount.current) return;

		const mountElement = mount.current;
		const width = mountElement.clientWidth;
		const height = mountElement.clientHeight;

		const scene = new Three.Scene();
		const camera = new Three.PerspectiveCamera(75, width / height, 0.1, 1000);
		const renderer = new Three.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha: false });
		const sphereGeometry = new Three.SphereBufferGeometry(1, 360, 360);
		const ambientLights = new Three.HemisphereLight(0xFFFFFF, 0x000000, 1);
		let animationFrameId = 0;
		const pointLight = new Three.PointLight(0xffffff, 1);
		scene.add(ambientLights);
		scene.add(pointLight);

		const uniforms = Three.UniformsUtils.merge([

			Three.UniformsLib["lights"],
			{

				u_time: { value: 0 },
				u_resolution: new Three.Uniform(new Three.Vector4()),
				u_uvRate1: new Three.Uniform(new Three.Vector2(1, 1)),
				u_envelope: { value: 0 },
				u_pointscale: { value: 0 },
				u_decay: { value: 1 },
				u_complex: { value: 0.5 },
				u_waves: { value: 6.0 },
				u_eqcolor: { value: 0.2 },
				u_bpm: { value: bpm },
				u_isPlaying: { value: 0 },
				u_noise: { value: 0 },
				u_chebyshev: { value: 0 },
				u_masterVolume: { value: 0 },
			}
		]);

		materialRef.current = new Three.ShaderMaterial({
			uniforms,
			// wireframe: true,
			vertexShader,
			fragmentShader,
			lights: true
		})

		const mesh = new Three.Mesh(sphereGeometry, materialRef.current);

		renderer.setSize(width, height)
		scene.add(mesh);
		camera.position.z = config.current.zoom;

		mount.current.appendChild(renderer.domElement);
		const FPS = 25;
		let clock = new Three.Clock();
		let delta = 0;
		let interval = 1 / FPS;

		function render(){
			animationFrameId = requestAnimationFrame(render);
			delta += clock.getDelta();

			if (delta > interval) {
				const material = materialRef.current;
				if (!material) return;
				material.uniforms.u_time.value += 0.05;

				if (camera.position.z !== config.current.zoom - config.current.chebyshev / 20) {
					camera.position.z = config.current.zoom - config.current.chebyshev / 20;
				}
				if (material.uniforms.u_chebyshev.value !== config.current.chebyshev) {
					material.uniforms.u_chebyshev.value = config.current.chebyshev;
				}
				if (material.uniforms.u_masterVolume.value !== config.current.masterVolume) {
					material.uniforms.u_masterVolume.value = config.current.masterVolume;
				}
				if (material.uniforms.u_bpm.value !== config.current.bpm) {
					material.uniforms.u_bpm.value = config.current.bpm;
				}
				if (material.uniforms.u_noise.value !== config.current.noise) {
					material.uniforms.u_noise.value = config.current.noise;
				}
				if (material.uniforms.u_isPlaying.value !== config.current.isPlaying) {
					material.uniforms.u_isPlaying.value = config.current.isPlaying
				}

				if (material.uniforms.u_envelope.value !== envelope.current?.value) {
					material.uniforms.u_envelope.value = envelope.current?.value ?? 0;
				}
				renderer.render(scene, camera)

				delta = delta % interval;
			}
		}

		animationFrameId = requestAnimationFrame(render)

		return () => {
			if (!mountElement) return;
			scene.remove(mesh);
			sphereGeometry.dispose();
			materialRef?.current?.dispose();
			cancelAnimationFrame(animationFrameId);

			mountElement.removeChild(renderer.domElement);
		}

		// should run only on mount
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		config.current.bpm = bpm;
	}, [bpm]);

	useEffect(() => {
		gsap.to(config.current, {
			isPlaying: isPlaying && currentBeatNotes.some(complement(isNil)),
			duration: 0.4,
			ease: "power3.out"
		});
	}, [currentBeatNotes, isPlaying])

	useEffect(() => {
		config.current.masterVolume = synthConfig.masterVolume;
		config.current.chebyshev = synthConfig.chebyshev;
		config.current.noise = synthConfig.noise;
	}, [synthConfig]);
}
