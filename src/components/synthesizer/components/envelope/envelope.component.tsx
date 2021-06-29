import { Knob } from "../../../UI/knob";
import { ControlsSection } from "../../../UI/controlsSection";
import { AmplitudeEnvelope } from "tone";
import { useEnvelope } from "./envelope.hooks";
import { useEffect, useMemo, useState } from "react";
import { NormalRange } from "tone/build/esm/core/type/Units";
import { RegisteredComponent } from "../../synthesizer.types";
import { useRegister } from "../../synthesizer.hooks";

export const Envelope = ({ register }: RegisteredComponent<AmplitudeEnvelope>) => {
	const envelope = useEnvelope();
	useRegister(register, envelope);

	const [attack, setAttack] = useState<NormalRange>(0.5);
	const [release, setRelease] = useState<NormalRange>(0.5);
	const [sustain, setSustain] = useState<NormalRange>(0.5);
	const [decay, setDecay] = useState<NormalRange>(0.5);

	useEffect(() => {
		envelope?.set({
			attack,
			release,
			sustain,
			decay
		})

		// should run on config values change
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [envelope, attack, release, sustain, decay]);

	return useMemo((() =>
			(
				<ControlsSection title="Envelope">
					<Knob label="Attack" onChange={setAttack} value={attack} />
					<Knob label="Release" onChange={setRelease} value={release} />
					<Knob label="Sustain" onChange={setSustain} value={sustain} />
					<Knob label="Decay" onChange={setDecay} value={decay} />
				</ControlsSection>
			)
	), [attack,
		release,
		sustain,
		decay])
}