import { RefObject, useCallback, useContext, useEffect, useRef } from "react";
import * as THREE from "three"
import gsap from "gsap";
import debounce from "lodash.debounce";
import { AmplitudeEnvelope } from "tone";
import { complement, isNil, omit } from "ramda";
import { TransportProvider } from "../../providers";
import { fragmentShader, vertexShader } from "./shaders";
import { VisualisationConfig } from "./visualisation.types";
import { createOscRgb } from "./visualisation.helpers";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const useRenderer = (mount: RefObject<HTMLElement>) => {
	const {
		isPlaying,
		bpm,
		envelopeRef,
		config: synthConfig,
		currentBeatNotes
	} = useContext(TransportProvider.Context);

	const envelope = useRef<AmplitudeEnvelope>();
	const config = useRef<VisualisationConfig>({
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
		let clock = new THREE.Clock();
		let delta = 0;
		const FPS = 24;
		let interval = 1 / FPS;

		const mountElement = mount.current;
		const width = mountElement.clientWidth;
		const height = mountElement.clientHeight;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha: false });
		const sphereGeometry = new THREE.SphereBufferGeometry(2, 230, 230);
		const ambientLights = new THREE.HemisphereLight(0xFFFFFF, 0x000000, 1);

		renderer.setPixelRatio(2);

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
		mesh.position.set(0, 0, 10);
		camera.position.set(0, 0, 0);

		renderer.setSize(width, height)
		scene.add(ambientLights);
		scene.add(mesh);

		const controls = new OrbitControls(camera, renderer.domElement);
		controls.maxZoom = 0;
		controls.minZoom = 0;
		controls.enablePan = false;
		controls.maxDistance = 20;
		controls.minDistance = 7.5;
		controls.enableDamping = true;
		controls.target.copy(mesh.position);
		controls.update()

		mount.current.appendChild(renderer.domElement);

		const resizeCanvasToDisplaySize = () => {
			if (!mount.current) return;

			const canvas = renderer.domElement;
			const { clientWidth, clientHeight } = mount.current;

			if (canvas.width !== clientWidth || canvas.height !== clientHeight) {
				renderer.setSize(clientWidth, clientHeight, false);
				camera.aspect = canvas.clientWidth / canvas.clientHeight;
				camera.updateProjectionMatrix();
			}
		}

		const render = () => {
			animationFrameId = requestAnimationFrame(render);
			delta += clock.getDelta();
			controls.update();
			resizeCanvasToDisplaySize();

			if (delta > interval) {
				const material = materialRef.current;
				if (!material) return;
				material.uniforms.u_time.value += 0.05;

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

		// animationFrameId = requestAnimationFrame(render)

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

	const handleRgbChange = (config: any, to: any) => {
		const rgb = createOscRgb(config)
		gsap.to(to, {
			r: rgb.r,
			g: rgb.g,
			b: rgb.b,
			duration: 1,
			ease: "power3.out"
		});
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleRgbDebounced1 = useCallback(debounce(handleRgbChange, 200), []);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleRgbDebounced2 = useCallback(debounce(handleRgbChange, 200), []);

	useEffect(() => {
		if (!config.current.oscillator1) return;
		handleRgbDebounced1(synthConfig.oscillator1, config.current.oscillator1);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [synthConfig.oscillator1])

	useEffect(() => {
		if (!config.current.oscillator2) return;
		handleRgbDebounced2(synthConfig.oscillator2, config.current.oscillator2);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [synthConfig.oscillator2])
}
