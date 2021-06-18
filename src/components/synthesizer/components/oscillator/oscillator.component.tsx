import { ControlsSection } from "../../../controlsSection";
import { WaveTypeSelect } from "../../../waveTypeSelect";
import { Knob } from "../../../knob";
import { useEffect, useState } from "react";
import { WaveTypes } from "../../../waveTypeSelect/waveTypeSelect.types";
import { useOscillator } from "./useOscillator.hooks";
import { Compressor } from "tone";

type OscillatorProps = {
	register: (component: Compressor) => void;
	triggerTime: number;
}

export const Oscillator = ({ register, triggerTime }: OscillatorProps) => {
	const [spread1, setSpread1] = useState(0);
	const [spread2, setSpread2] = useState(0);
	const [oscWave1, setOscWave1] = useState<WaveTypes>(WaveTypes.SIN);
	const [oscWave2, setOscWave2] = useState<WaveTypes>(WaveTypes.SIN);
	const [isRegistered, setIsRegistered] = useState(false);
	const oscillator1 = useOscillator({
		frequency: 0,
		baseNote: "C1",
		oscWave1,
		oscWave2,
		spread2,
		spread1,
		triggerTime
	});

	useEffect(() => {
		if (!oscillator1 || isRegistered) return;

		console.log("-> registering oscillators ",)
		register(oscillator1);
		setIsRegistered(true);
	}, [oscillator1, setIsRegistered, isRegistered, register])

	return (
		<>
			<ControlsSection title="Oscillator 1">
				<WaveTypeSelect label="Wave form" onChange={setOscWave1} value={oscWave1} />
				<Knob label="Freq" max={2000} onChange={setSpread1} defaultValue={0} step={40} />
			</ControlsSection>
			<ControlsSection title="Oscillator 2">
				<WaveTypeSelect label="Wave form" value={oscWave2} onChange={setOscWave2} />
				<Knob label="Freq" max={2000} onChange={setSpread2} defaultValue={0} step={40} />
			</ControlsSection>
		</>
	)
}