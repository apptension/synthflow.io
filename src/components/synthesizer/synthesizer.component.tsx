import { useContext, useEffect, useState } from "react";
import {
	AmplitudeEnvelope,
	connect,
	Destination,
	Filter as FilterType, Freeverb,
	Gain,
	Chebyshev as ChebyshevType
} from "tone";
import { Container, ControlsPaneLeft, ControlsPaneRight, PanelsRow } from "./synthesizer.style"
import { AppSettingsProvider } from "../../providers";
import { Envelope, Filter, Oscillator } from "./components";
import { Noise } from "./components/noise";
import { Reverb } from "./components/reverb";
import { Chebyshev } from "./components/chebyshev";
import { TransportControls } from "./components/transportControls"
import { Sequencer } from "../sequencer";
import { useCompressor, useVolume } from "./synthesizer.hooks";

export const Synthesizer = () => {
	const { showControls } = useContext(AppSettingsProvider.Context);
	const [oscillators, registerOscillators] = useState<Gain>();
	const [chebyshev, registerChebyshev] = useState<ChebyshevType>();
	const [envelope, registerEnvelope] = useState<AmplitudeEnvelope>();
	const [filter, registerFilter] = useState<FilterType>();
	const [noise, registerNoise] = useState<Gain>();
	const [reverb, registerReverb] = useState<Freeverb>();
	const [masterVolume, registerMasterVolume] = useState<Gain>();
	const compressor = useCompressor();
	const [isConnected, setIsConnected] = useState(false);
	const volume = useVolume();

	useEffect(() => {
		if (isConnected) return;
		if (!(
			oscillators &&
			envelope &&
			filter &&
			noise &&
			reverb &&
			chebyshev &&
			masterVolume &&
			compressor &&
			volume
		)) return;

		connect(oscillators, envelope);
		connect(noise, envelope);
		connect(envelope, compressor);
		connect(compressor, chebyshev);
		connect(chebyshev, filter);
		connect(filter, reverb);
		connect(reverb, masterVolume);
		connect(masterVolume, volume);
		connect(volume, Destination)

		setIsConnected(true);
		console.info("-> Tone connected")
	}, [
		compressor,
		masterVolume,
		isConnected,
		setIsConnected,
		chebyshev,
		reverb,
		filter,
		envelope,
		oscillators,
		noise,
		volume
	]);

	return (
		<Container isVisible={showControls}>
			<ControlsPaneLeft>
				<Oscillator register={registerOscillators} />
				<Envelope register={registerEnvelope} />
			</ControlsPaneLeft>
			<ControlsPaneRight>
				<TransportControls register={registerMasterVolume} />
				<PanelsRow>
					<Filter register={registerFilter} />
					<Noise register={registerNoise} />
				</PanelsRow>
				<PanelsRow>
				<Reverb register={registerReverb} />
					<Chebyshev register={registerChebyshev} />
				</PanelsRow>
			</ControlsPaneRight>
			<Sequencer />
		</Container>
	)
}