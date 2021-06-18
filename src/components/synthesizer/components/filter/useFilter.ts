import { useEffect, useRef } from "react";
import { Filter } from "tone";

export const useFilter = () => {
	const filter = useRef<Filter>();

	useEffect(() => {
		filter.current = new Filter({
			frequency: 0,
			rolloff: -12
		})
	}, [])

	return filter.current;
}