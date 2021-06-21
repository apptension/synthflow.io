import { Gain } from "tone";
import { useEffect, useRef } from "react";

export const useMasterVolume = () => {
	const gain = useRef<Gain>();

	useEffect(() => {
		gain.current = new Gain(1);
	}, [])

	return gain.current;
}