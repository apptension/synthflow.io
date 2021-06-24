import { useEffect, useRef } from "react";
import { Analyser } from "tone";

export const useAnalyser = () => {
	const analyserRef = useRef<Analyser>();

	useEffect(() => {
		analyserRef.current = new Analyser();
	}, [])

	return analyserRef.current;
}
