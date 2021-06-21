import { Freeverb } from "tone";
import { useEffect, useRef } from "react";

export const useReverb = () => {
	const reverb = useRef<Freeverb>();

	useEffect(() => {
		reverb.current = new Freeverb({
			roomSize: 0.1,
		});
	}, [])

	return reverb.current;
}