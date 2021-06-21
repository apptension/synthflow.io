import { useContext, useEffect, useRef } from "react";
import { Compressor, FatOscillator, Signal, ToneOscillatorType, Frequency } from "tone";
import { TransportProvider } from "../../../../providers";

type OscillatorHookProps = {
	frequency: number,
	baseNote: string,
	oscWave1: ToneOscillatorType,
	oscWave2: ToneOscillatorType,
	detune1: number,
	detune2: number
}

export const useOscillator = ({
	frequency,
	baseNote,
	oscWave1,
	oscWave2,
	detune1,
	detune2,
}: OscillatorHookProps) => {
	const { triggerTime } = useContext(TransportProvider.Context);

	const oscillator1 = useRef<FatOscillator>();
	const oscillator2 = useRef<FatOscillator>();
	const compressor = useRef<Compressor>();
	const signal = useRef<Signal<"frequency">>();

	useEffect(() => {
		oscillator1.current = new FatOscillator(0, 'sine', detune1).start();
		oscillator2.current = new FatOscillator(0, 'sine', detune2).start();
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
		oscillator1.current?.set({ type: oscWave1, detune: detune1 })
	}, [oscWave1, detune1])

	useEffect(() => {
		oscillator2.current?.set({ type: oscWave2, detune: detune2 })
	}, [oscWave2, detune2]);

	return compressor.current;
}