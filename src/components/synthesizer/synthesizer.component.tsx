import { useContext, useEffect, useState } from "react";
import {
	AmplitudeEnvelope,
	Compressor, connect, Destination, Filter as FilterType, Loop, start,
	Transport,
} from "tone";
import { Container } from "./synthesizer.style"
import { AppSettingsProvider } from "../../providers";
import { Envelope, Filter, Oscillator } from "./components";

export const Synthesizer = () => {
	const { showControls } = useContext(AppSettingsProvider.Context);
	const [oscillators, registerOscillators] = useState<Compressor>();
	const [envelope, registerEnvelope] = useState<AmplitudeEnvelope>();
	const [filter, registerFilter] = useState<FilterType>();
	const [isConnected, setIsConnected] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [triggerTime, setTriggerTime] = useState(0);

	useEffect(() => {
		if (isConnected) return;
		if (oscillators && envelope && filter) {
			connect(oscillators, envelope);
			connect(envelope, filter);
			connect(filter, Destination);
			console.info("-> Tone connected")
			setIsConnected(true);
		}
	}, [
		isConnected,
		setIsConnected,
		filter,
		envelope,
		oscillators,
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
		</Container>
	)
}