import { ControlsSection } from "../../../controlsSection";
import { WaveTypeSelect } from "../../../waveTypeSelect";
import { Knob } from "../../../knob";
import { useContext, useEffect, useMemo, useState } from "react";
import { WaveTypes } from "../../../waveTypeSelect/waveTypeSelect.types";
import { useOscillator } from "./useOscillator.hooks";
import { Gain } from "tone";
import { RegisteredComponent } from "../../synthesizer.types";
import { useGain, useRegister } from "../../synthesizer.hooks";
import { TransportProvider } from "../../../../providers";
import { isNil } from "ramda";

export const Oscillator = ({ register }: RegisteredComponent<Gain>) => {
	const [detune1, setDetune1] = useState(0);
	const [detune2, setDetune2] = useState(0);
	const [oscWave1, setOscWave1] = useState<WaveTypes>(WaveTypes.SIN);
	const [oscWave2, setOscWave2] = useState<WaveTypes>(WaveTypes.SIN);
	const [isConnected, setIsConnected] = useState(false);

	const gain = useGain();

	const { currentBeatNotes, triggerTime } = useContext(TransportProvider.Context);

	const oscillator1 = useOscillator({
		oscWave1,
		oscWave2,
		detune2,
		detune1,
	});

	const oscillator2 = useOscillator({
		oscWave1,
		oscWave2,
		detune2,
		detune1,
	});

	const oscillator3 = useOscillator({
		oscWave1,
		oscWave2,
		detune2,
		detune1,
	});

	useEffect(() => {
		if (isConnected || !gain || !oscillator1 || !oscillator2 || !oscillator3) return;

		oscillator1.gain?.connect(gain);
		oscillator2.gain?.connect(gain);
		oscillator3.gain?.connect(gain);
		setIsConnected(true);
	}, [gain, isConnected, oscillator1, oscillator2, oscillator3])

	useEffect(() => {
		const voices = [oscillator1, oscillator2, oscillator3];

		voices.forEach((voice, index) => {
			const noteVoice = currentBeatNotes[index];

			if (isNil(noteVoice)) {
				voice?.gain?.gain.setValueAtTime(0, triggerTime)
			} else {
				voice?.gain?.gain.setValueAtTime(1, triggerTime)
				voice.signal?.setValueAtTime(noteVoice, triggerTime)
			}
		})

		// should run on beat note change
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentBeatNotes, triggerTime])

	useRegister(register, gain);

	return useMemo(() => (
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
	), [oscWave1, oscWave2, detune1, detune2])
}