import { useEffect, useRef } from "react";
import { Meter } from "tone";

export const useMeter = () => {
	const meterRef = useRef<Meter>();

	useEffect(() => {
		meterRef.current = new Meter({
			smoothing: 0.9
		});
	}, [])

	return meterRef.current;
}
