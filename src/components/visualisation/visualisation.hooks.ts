import { RefObject, useCallback, useContext, useEffect, useRef } from "react";
import * as THREE from "three"
import gsap from "gsap";
import debounce from "lodash.debounce";
import { AmplitudeEnvelope } from "tone";
import { complement, isNil, omit } from "ramda";
import { TransportProvider } from "../../providers";
import { fragmentShader, vertexShader } from "./shaders";
import { ConfigType } from "../../providers/transportProvider/transportProvider.types";
import { WaveTypes } from "../waveTypeSelect/waveTypeSelect.types";

const createOscRgb = ({ waveType, detune }: ConfigType["oscillator1"]) => {
	return {
		r: Number(waveType === WaveTypes.SIN) / 2 + detune / 1500.,
		g: Number(waveType === WaveTypes.SQUARE) / 3 + detune / 1500.,
		b: Number(waveType === WaveTypes.SAWTOOTH) / 4.5 + detune / 1500.,
	}
}

export type Rgb = {
	r: number;
	g: number;
	b: number;
}
export const useRenderer = (mount: RefObject<HTMLElement>) => {
	const {
		isPlaying,
		bpm,
		envelopeRef,
		config: synthConfig,
		currentBeatNotes
	} = useContext(TransportProvider.Context);

	const envelope = useRef<AmplitudeEnvelope>();
	const config = useRef<{
		isPlaying: number;
		bpm: number;
		zoom: number;
	} & Omit<ConfigType, "oscillator1" | "oscillator2"> & {
		oscillator1: Rgb
		oscillator2: Rgb
	}>({
		isPlaying: Number(isPlaying),
		bpm,
		zoom: 5,
		...omit(["oscillator1", "oscillator2"], synthConfig),
		oscillator1: { r: 0, g: 0, b: 0 },
		oscillator2: { r: 0, g: 0, b: 0 }
	});
	const materialRef = useRef<THREE.ShaderMaterial>();

	useEffect(() => {
		if (envelope.current) return;
		envelope.current = envelopeRef;
	}, [envelopeRef])


	useEffect(() => {
		if (!mount.current) return;

		let animationFrameId = 0;
		const FPS = 30;
		let clock = new THREE.Clock();
		let delta = 0;
		let interval = 1 / FPS;

		const mountElement = mount.current;
		const width = mountElement.clientWidth;
		const height = mountElement.clientHeight;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha: false });
		const sphereGeometry = new THREE.SphereBufferGeometry(1, 360, 360);
		const ambientLights = new THREE.HemisphereLight(0xFFFFFF, 0x000000, 1);

		const uniforms = {
			u_time: { value: 0 },
			u_resolution: new THREE.Uniform(new THREE.Vector4()),
			u_uvRate1: new THREE.Uniform(new THREE.Vector2(1, 1)),
			u_osc1Rgb: new THREE.Uniform(new THREE.Vector3(1)),
			u_osc2Rgb: new THREE.Uniform(new THREE.Vector3(1)),
			u_envelope: { value: 0 },
			u_decay: { value: 1 },
			u_waves: { value: 6 },
			u_bpm: { value: bpm },
			u_isPlaying: { value: 0 },
			u_noise: { value: 0 },
			u_chebyshev: { value: 0 },
			u_masterVolume: { value: 0 },
			u_reverb: { value: 0 },
			u_filter: { value: 0 }
		};

		materialRef.current = new THREE.ShaderMaterial({
			uniforms,
			vertexShader,
			fragmentShader,
		})

		const mesh = new THREE.Mesh(sphereGeometry, materialRef.current);

		renderer.setSize(width, height)
		scene.add(ambientLights);
		scene.add(mesh);

		camera.position.z = config.current.zoom;

		mount.current.appendChild(renderer.domElement);

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

				if (material.uniforms.u_filter.value !== config.current.filter) {
					material.uniforms.u_filter.value = config.current.filter;
				}

				if (material.uniforms.u_reverb.value !== config.current.reverb) {
					material.uniforms.u_reverb.value = config.current.reverb;
				}

				if (material.uniforms.u_isPlaying.value !== config.current.isPlaying) {
					material.uniforms.u_isPlaying.value = config.current.isPlaying
				}

				if (material.uniforms.u_envelope.value !== envelope.current?.value) {
					material.uniforms.u_envelope.value = envelope.current?.value ?? 0;
				}

				if (
					material.uniforms.u_osc1Rgb.value.x !== config.current.oscillator1.r ||
					material.uniforms.u_osc1Rgb.value.y !== config.current.oscillator1.g ||
					material.uniforms.u_osc1Rgb.value.z !== config.current.oscillator1.b
				) {
					material.uniforms.u_osc1Rgb.value = new THREE.Vector3(config.current.oscillator1.r, config.current.oscillator1.g, config.current.oscillator1.b);
				}

				if (
					material.uniforms.u_osc2Rgb.value.x !== config.current.oscillator2.r ||
					material.uniforms.u_osc2Rgb.value.y !== config.current.oscillator2.g ||
					material.uniforms.u_osc2Rgb.value.z !== config.current.oscillator2.b
				) {
					material.uniforms.u_osc2Rgb.value = new THREE.Vector3(config.current.oscillator2.r, config.current.oscillator2.g, config.current.oscillator2.b);
				}

				renderer.render(scene, camera);

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
		config.current.reverb = synthConfig.reverb;
		config.current.filter = synthConfig.filter;
	}, [synthConfig.masterVolume, synthConfig.noise, synthConfig.chebyshev, synthConfig.reverb, synthConfig.filter]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debounced = useCallback(debounce((config: any, to: any) => {
		const rgb = createOscRgb(config)
		gsap.to(to, {
			r: rgb.r,
			g: rgb.g,
			b: rgb.b,
			duration: 1,
			ease: "power3.out"
		});
	}, 200), []);

	useEffect(() => {
		if (!config.current.oscillator1) return;
		debounced(synthConfig.oscillator1, config.current.oscillator1);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [synthConfig.oscillator1])

	useEffect(() => {
		if (!config.current.oscillator2) return;
		debounced(synthConfig.oscillator2, config.current.oscillator2);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [synthConfig.oscillator2])
}
