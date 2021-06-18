import { Knob } from "../../../knob";
import { ControlsSection } from "../../../controlsSection";
import { AmplitudeEnvelope } from "tone";
import { useEnvelope } from "./useEnvelope.hooks";
import { useEffect, useState } from "react";

type EnvelopeProps = {
	register: (component: AmplitudeEnvelope) => void;
	triggerTime: number;
}

export const Envelope = ({ register, triggerTime }: EnvelopeProps) => {
	const { envelope } = useEnvelope(triggerTime)
	const [isRegistered, setRegistered] = useState(false);

	useEffect(() => {
		if (!envelope || isRegistered) return;
		console.info("-> registering envelope")
		register(envelope);
		setRegistered(true);
	}, [envelope, isRegistered, setRegistered, register])

	return (
		<ControlsSection title="Envelope">
			<Knob label="Attack" max={100} onChange={(value) => {
				if (!envelope) return;
				envelope.set({ attack: value / 100 })
			}} defaultValue={10} />
			<Knob label="Release" max={100} onChange={(value) => {
				if (!envelope) return;
				envelope.set({ release: value / 100 })
			}} />
			<Knob label="Sustain" max={100} onChange={(value) => {
				if (!envelope) return;
				envelope.set({ sustain: value / 100 })
			}} />
			<Knob label="Decay" max={100} onChange={(value) => {
				if (!envelope) return;
				envelope.set({ decay: value / 100 })
			}} />
		</ControlsSection>
	)
}