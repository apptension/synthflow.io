import { useContext, useEffect, useMemo, useState } from "react";
import { Filter as FilterClass } from "tone";
import { useFilter } from "./filter.hooks";
import { ControlsSection } from "../../../UI/controlsSection";
import { Knob } from "../../../UI/knob";
import { RegisteredComponent } from "../../synthesizer.types";
import { useRegister } from "../../synthesizer.hooks";
import { TransportProvider } from "../../../../providers";

export const Filter = ({ register }: RegisteredComponent<FilterClass>) => {
	const filter = useFilter();
	useRegister(register, filter);
	const { setConfig } = useContext(TransportProvider.Context);

	const [frequency, setFrequency] = useState(8000);

	useEffect(() => {
		filter?.set({ frequency });

		setConfig(state => ({
			...state,
			filter: frequency
		}))

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [frequency, filter])

	return useMemo(() => (
		<ControlsSection title="Filter">
			<Knob
				label="Frequency"
				onChange={setFrequency}
				value={frequency}
				max={10000}
				min={100}
				step={100}
				normalRange={false}
			/>
		</ControlsSection>
	), [frequency])
}
