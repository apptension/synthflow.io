import { useEffect, useRef } from "react";
import { Compressor, FatOscillator, Signal, ToneOscillatorType, Frequency } from "tone";

type OscillatorHookProps = {
	triggerTime: number,
	frequency: number,
	baseNote: string,
	oscWave1: ToneOscillatorType,
	oscWave2: ToneOscillatorType,
	spread1: number,
	spread2: number
}

export const useOscillator = ({
	frequency,
	baseNote,
	oscWave1,
	oscWave2,
	spread1,
	spread2,
	triggerTime
}: OscillatorHookProps) => {
	const oscillator1 = useRef<FatOscillator>();
	const oscillator2 = useRef<FatOscillator>();
	const compressor = useRef<Compressor>();
	const signal = useRef<Signal<"frequency">>();

	useEffect(() => {
		oscillator1.current = new FatOscillator(0, 'sine', spread1).start();
		oscillator2.current = new FatOscillator(0, 'sine', spread2).start();
		compressor.current = new Compressor(-30, 3);

		signal.current = new Signal<"frequency">({
			value: baseNote,
			units: "frequency"
		})

		signal.current?.connect(oscillator1.current?.frequency);
		signal.current?.connect(oscillator2.current?.frequency);

		oscillator1.current.connect(compressor.current);
		oscillator2.current.connect(compressor.current);

		// should run only on mount
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		signal?.current?.setValueAtTime(Frequency(baseNote).toFrequency() + frequency, triggerTime);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [frequency, triggerTime, signal])

	useEffect(() => {
		oscillator1.current?.set({ type: oscWave1 })
	}, [oscWave1])

	useEffect(() => {
		oscillator1.current?.set({ detune: spread1 })
	}, [spread1])

	useEffect(() => {
		oscillator2.current?.set({ type: oscWave2 })
	}, [oscWave2]);

	useEffect(() => {
		oscillator2.current?.set({ detune: spread2 })
	}, [spread2]);



	return compressor.current;
}