import { Chebyshev } from "tone";
import { useEffect, useRef } from "react";

export const useChebyshev = () => {
	const chebyshev = useRef<Chebyshev>();

	useEffect(() => {
		chebyshev.current = new Chebyshev(1);
	}, [])

	return chebyshev.current;
}