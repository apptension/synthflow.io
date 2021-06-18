import { Filter as FilterClass } from "tone";
import { useFilter } from "./useFilter";
import { useEffect, useState } from "react";
import { ControlsSection } from "../../../controlsSection";
import { Knob } from "../../../knob";

type FilterProps = {
	register: (component: FilterClass) => void;
}

export const Filter = ({ register }: FilterProps) => {
	const filter = useFilter();
	const [isRegistered, setRegistered] = useState(false);
	const [frequency, setFrequency] = useState(0);

	useEffect(() => {
		if (!filter || isRegistered) return;
		console.info("-> registering filter");
		register(filter);
		setRegistered(true);
	}, [filter, isRegistered, register]);

	useEffect(() => {
		filter?.set({ frequency })
	}, [frequency, filter])

	return (
		<ControlsSection title="Filter">
			<Knob label="Frequency" onChange={setFrequency} value={frequency} max={4000} step={40} normalRange={false} />
		</ControlsSection>
	)
}
