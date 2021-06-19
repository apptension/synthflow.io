import { Gain, Noise } from "tone";
import { useEffect, useRef } from "react";

export const useNoise = () => {
	const noise = useRef<Noise>();
	const gain = useRef<Gain>();

	useEffect(() => {
		noise.current = new Noise('pink').start();
		gain.current = new Gain({
			gain: 0
		});

		noise.current.connect(gain.current)

	}, [])

	return gain.current;
}