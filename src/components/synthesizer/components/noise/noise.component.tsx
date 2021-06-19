import { Gain } from "tone";
import { useNoise } from "./noise.hooks";
import { useEffect, useState } from "react";
import { ControlsSection } from "../../../controlsSection";
import { Knob } from "../../../knob";
import { NormalRange } from "tone/build/esm/core/type/Units";

type NoiseProps = {
	register: (component: Gain) => void;
}

export const Noise = ({ register }: NoiseProps) => {
	const noise = useNoise();
	const [isRegistered, setRegistered] = useState(false);
	const [gain, setGain] = useState<NormalRange>(0);

	useEffect(() => {
		if (!noise || isRegistered) return;
		console.info("-> registering noise");
		register(noise);
		setRegistered(true);
	}, [isRegistered, noise, register])

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