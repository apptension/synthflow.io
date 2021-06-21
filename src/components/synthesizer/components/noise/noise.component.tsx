import { Gain } from "tone";
import { useNoise } from "./noise.hooks";
import { useEffect, useState } from "react";
import { ControlsSection } from "../../../controlsSection";
import { Knob } from "../../../knob";
import { NormalRange } from "tone/build/esm/core/type/Units";
import { RegisteredComponent } from "../../synthesizer.types";
import { useRegister } from "../../synthesizer.hooks";

export const Noise = ({ register }: RegisteredComponent<Gain>) => {
	const noise = useNoise();
	useRegister(register, noise);

	const [gain, setGain] = useState<NormalRange>(0);

	useEffect(() => {
		noise?.set({
			gain
		})

		// should run on config values change
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gain])
	return (
		<ControlsSection title="Noise">
			<Knob label="Gain" onChange={setGain} value={gain} />
		</ControlsSection>
	)
}