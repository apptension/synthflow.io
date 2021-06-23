import { useEffect, useRef } from "react";
import { Filter } from "tone";

export const useFilter = () => {
	const filter = useRef<Filter>();

	useEffect(() => {
		filter.current = new Filter({
			frequency: 0,
			rolloff: -24,
		})
	}, [])

	return filter.current;
}