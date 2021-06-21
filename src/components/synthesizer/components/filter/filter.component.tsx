import { Filter as FilterClass } from "tone";
import { useFilter } from "./filter.hooks";
import { useEffect, useState } from "react";
import { ControlsSection } from "../../../controlsSection";
import { Knob } from "../../../knob";
import { RegisteredComponent } from "../../synthesizer.types";

export const Filter = ({ register }: RegisteredComponent<FilterClass>) => {
	const filter = useFilter();
	const [isRegistered, setRegistered] = useState(false);
	const [frequency, setFrequency] = useState(4000);

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
			<Knob label="Frequency" onChange={setFrequency} value={frequency} max={20000} step={100} normalRange={false} />
		</ControlsSection>
	)
}
