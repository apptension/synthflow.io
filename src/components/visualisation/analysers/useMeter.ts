import { useEffect, useRef } from "react";
import { Meter } from "tone";

export const useMeter = () => {
	const meterRef = useRef<Meter>();

	useEffect(() => {
		meterRef.current = new Meter();
	}, [])

	return meterRef.current;
}
