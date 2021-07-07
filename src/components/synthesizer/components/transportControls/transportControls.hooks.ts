import { useEffect, useRef } from "react";
import { Gain } from "tone";

export const useMasterVolume = () => {
	const gain = useRef<Gain>();

	useEffect(() => {
		gain.current = new Gain(1);
	}, [])

	return gain.current;
}