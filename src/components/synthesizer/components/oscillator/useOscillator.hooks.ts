import { useEffect, useRef } from "react";
import { FatOscillator, Signal, ToneOscillatorType, Gain } from "tone";

type OscillatorHookProps = {
	oscWave1: ToneOscillatorType,
	oscWave2: ToneOscillatorType,
	detune1: number,
	detune2: number
}

export const useOscillator = ({
	oscWave1,
	oscWave2,
	detune1,
	detune2,
}: OscillatorHookProps) => {
	// const { triggerTime } = useContext(TransportProvider.Context);

	const oscillator1 = useRef<FatOscillator>();
	const oscillator2 = useRef<FatOscillator>();
	const gain = useRef<Gain>();
	const signal = useRef<Signal<"frequency">>();

	useEffect(() => {
		oscillator1.current = new FatOscillator(0, oscWave1, detune1).start();
		oscillator2.current = new FatOscillator(0, oscWave2, detune2).start();
		gain.current = new Gain(1);

		signal.current = new Signal<"frequency">({
			value: 'C1',
			units: "frequency"
		})

		signal.current?.connect(oscillator1.current?.frequency);
		signal.current?.connect(oscillator2.current?.frequency);

		oscillator1.current.connect(gain.current);
		oscillator2.current.connect(gain.current);

		// should run only on mount
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		oscillator1.current?.set({ type: oscWave1, detune: detune1 })
	}, [oscWave1, detune1])

	useEffect(() => {
		oscillator2.current?.set({ type: oscWave2, detune: detune2 })
	}, [oscWave2, detune2]);

	return { gain: gain.current, signal: signal.current};
}