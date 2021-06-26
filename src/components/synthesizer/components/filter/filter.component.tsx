import { useEffect, useMemo, useState } from "react";
import { Filter as FilterClass } from "tone";
import { useFilter } from "./filter.hooks";
import { ControlsSection } from "../../../controlsSection";
import { Knob } from "../../../knob";
import { RegisteredComponent } from "../../synthesizer.types";
import { useRegister } from "../../synthesizer.hooks";

export const Filter = ({ register }: RegisteredComponent<FilterClass>) => {
	const filter = useFilter();
	useRegister(register, filter);

	const [frequency, setFrequency] = useState(8000);

	useEffect(() => {
		filter?.set({ frequency })
	}, [frequency, filter])

	return useMemo(() => (
		<ControlsSection title="Filter">
			<Knob label="Frequency" onChange={setFrequency} value={frequency} max={20000} step={100} normalRange={false} />
		</ControlsSection>
	), [frequency])
}
