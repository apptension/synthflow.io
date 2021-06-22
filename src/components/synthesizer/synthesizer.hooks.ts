import { useEffect, useRef, useState } from "react";
import { Compressor, Gain } from "tone";
import { RegisteredComponent } from "./synthesizer.types";

export const useRegister = <T>(register: RegisteredComponent<T>["register"], synthComponent: T | undefined) => {
	const [isRegistered, setRegistered] = useState(false);

	useEffect(() => {
		if (!synthComponent || isRegistered) return;
		register(synthComponent);
		setRegistered(true);
	}, [synthComponent, isRegistered, setRegistered, register])
}

export const useCompressor = () => {
	const compressor = useRef<Compressor>();

	useEffect(() => {
		compressor.current = new Compressor(-30, 3);
	})

	return compressor.current;
}

export const useGain = () => {
	const gain = useRef<Gain>();

	useEffect(() => {
		gain.current = new Gain(1);
	})

	return gain.current;
}