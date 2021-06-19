import { Knob } from "../../../knob";
import { ControlsSection } from "../../../controlsSection";
import { AmplitudeEnvelope } from "tone";
import { useEnvelope } from "./envelope.hooks";
import { useEffect, useState } from "react";
import { NormalRange } from "tone/build/esm/core/type/Units";

type EnvelopeProps = {
	register: (component: AmplitudeEnvelope) => void;
	triggerTime: number;
}

export const Envelope = ({ register, triggerTime }: EnvelopeProps) => {
	const envelope = useEnvelope(triggerTime)
	const [isRegistered, setRegistered] = useState(false);
	const [attack, setAttack] = useState<NormalRange>(0);
	const [release, setRelease] = useState<NormalRange>(0);
	const [sustain, setSustain] = useState<NormalRange>(0);
	const [decay, setDecay] = useState<NormalRange>(0);

	useEffect(() => {
		if (!envelope || isRegistered) return;
		console.info("-> registering envelope")
		register(envelope);
		setRegistered(true);
	}, [envelope, isRegistered, setRegistered, register])

	useEffect(() => {
		envelope?.set({
			attack,
			release,
			sustain,
			decay
		})

		// should run on config values change
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [attack, release, sustain, decay]);

	return (
		<ControlsSection title="Envelope">
			<Knob label="Attack" onChange={setAttack} value={attack} />
			<Knob label="Release" onChange={setRelease} value={release} />
			<Knob label="Sustain" onChange={setSustain} value={sustain} />
			<Knob label="Decay" onChange={setDecay} value={decay} />
		</ControlsSection>
	)
}