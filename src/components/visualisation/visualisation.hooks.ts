import { RefObject, useContext, useEffect, useRef } from "react";
import { TransportProvider } from "../../providers";
import { fragmentShader } from "./shaders";
import * as Three from "three"

export const useRenderer = (mount: RefObject<HTMLElement>) => {
	const { isPlaying } = useContext(TransportProvider.Context);
	const materialRef = useRef<Three.ShaderMaterial>();
	const config = useRef<{
		isPlaying: boolean;
	}>({
		isPlaying
	});

	useEffect(() => {
		if (!mount.current) return;

		const mountElement = mount.current;
		const width = mountElement.clientWidth;
		const height = mountElement.clientHeight;

		const scene = new Three.Scene();
		const camera = new Three.PerspectiveCamera(75, width / height, 0.1, 1000);
		const renderer = new Three.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha: false });
		const sphereGeometry = new Three.SphereBufferGeometry(2, 64, 64);

		materialRef.current = new Three.ShaderMaterial({
			extensions: {
				derivatives: true
			},
			side: Three.DoubleSide,
			uniforms: {
				u_time: { value: 0 },
				u_resolution: new Three.Uniform(new Three.Vector4()),
				U_uvRate1: new Three.Uniform(new Three.Vector2(1, 1)),
			},
			wireframe: true,
			// vertexShader,
			fragmentShader
		})

		const mesh = new Three.Mesh(sphereGeometry, materialRef.current);

		renderer.setSize(width, height)
		scene.add(mesh);
		camera.position.z = 4
		mount.current.appendChild(renderer.domElement);

		const render = () => {
			const material = materialRef.current;
			if (!material) return;

			material.uniforms.u_time.value += 0.05;
			renderer.render(scene, camera)
			requestAnimationFrame(render);
		}

		requestAnimationFrame(render)

		return () => {
			if (!mountElement) return;

			mountElement.removeChild(renderer.domElement);
			scene.remove(mesh);
			sphereGeometry.dispose();
			materialRef?.current?.dispose();
		}

		// should run only on mount
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		config.current.isPlaying = isPlaying;
	}, [isPlaying]);
}