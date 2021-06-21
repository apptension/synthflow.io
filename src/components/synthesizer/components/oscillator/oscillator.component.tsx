import { ControlsSection } from "../../../controlsSection";
import { WaveTypeSelect } from "../../../waveTypeSelect";
import { Knob } from "../../../knob";
import { useState } from "react";
import { WaveTypes } from "../../../waveTypeSelect/waveTypeSelect.types";
import { useOscillator } from "./useOscillator.hooks";
import { Compressor } from "tone";
import { RegisteredComponent } from "../../synthesizer.types";
import { useRegister } from "../../synthesizer.hooks";

type OscillatorProps = RegisteredComponent<Compressor> & {
	triggerTime: number;
}

export const Oscillator = ({ register, triggerTime }: OscillatorProps) => {
	const [detune1, setDetune1] = useState(0);
	const [detune2, setDetune2] = useState(0);
	const [oscWave1, setOscWave1] = useState<WaveTypes>(WaveTypes.SIN);
	const [oscWave2, setOscWave2] = useState<WaveTypes>(WaveTypes.SIN);
	const oscillator1 = useOscillator({
		frequency: 0,
		baseNote: "E2",
		oscWave1,
		oscWave2,
		detune2,
		detune1,
		triggerTime
	});

	useRegister(register, oscillator1);

	return (
		<>
			<ControlsSection title="Oscillator 1">
				<WaveTypeSelect label="Wave form" onChange={setOscWave1} value={oscWave1} />
				<Knob label="Detune" max={2000} onChange={setDetune1} value={detune1} step={40} normalRange={false} />
			</ControlsSection>
			<ControlsSection title="Oscillator 2">
				<WaveTypeSelect label="Wave form" value={oscWave2} onChange={setOscWave2} />
				<Knob label="Detune" max={2000} onChange={setDetune2} value={detune2} step={40} normalRange={false} />
			</ControlsSection>
		</>
	)
}