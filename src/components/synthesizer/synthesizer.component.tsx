import { useContext, useEffect, useState } from "react";
import {
	AmplitudeEnvelope,
	Compressor,
	connect,
	Destination,
	Filter as FilterType,
	Gain,
	Loop,
	start,
	Transport,
} from "tone";
import { Container } from "./synthesizer.style"
import { AppSettingsProvider } from "../../providers";
import { Envelope, Filter, Oscillator } from "./components";
import { Noise } from "./components/noise";

export const Synthesizer = () => {
	const { showControls } = useContext(AppSettingsProvider.Context);
	const [oscillators, registerOscillators] = useState<Compressor>();
	const [envelope, registerEnvelope] = useState<AmplitudeEnvelope>();
	const [filter, registerFilter] = useState<FilterType>();
	const [noise, registerNoise] = useState<Gain>();
	const [isConnected, setIsConnected] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [triggerTime, setTriggerTime] = useState(0);

	useEffect(() => {
		if (isConnected) return;
		if (oscillators && envelope && filter && noise) {
			connect(oscillators, envelope);
			connect(noise, envelope);
			connect(envelope, filter);
			connect(filter, Destination);

			setIsConnected(true);
			console.info("-> Tone connected")
		}
	}, [
		isConnected,
		setIsConnected,
		filter,
		envelope,
		oscillators,
		noise
	]);

	useEffect(() => {
		if (isPlaying) {
			const loop = new Loop(time => {
				setTriggerTime(time);
			}, "8n");

			loop.start(0);

			return () => {
				loop.dispose();
			}
		}
	}, [isPlaying]);

	const handlePlay = () => {
		if (!isPlaying) {
			start().then(() => {
				Transport.start();
			});
			setIsPlaying(true);
		} else {
			Transport.stop();
			setIsPlaying(false)
		}
	}

	return (
		<Container isVisible={showControls}>
			<button onClick={handlePlay}>Play</button>
			<Oscillator register={registerOscillators} triggerTime={triggerTime} />
			<Envelope register={registerEnvelope} triggerTime={triggerTime} />
			<Filter register={registerFilter} />
			<Noise register={registerNoise} />
		</Container>
	)
}