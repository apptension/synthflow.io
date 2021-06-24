import { useContext, useEffect, useState } from "react";
import {
	AmplitudeEnvelope,
	connect,
	Destination,
	Filter as FilterType, Freeverb,
	Gain,
	Chebyshev as ChebyshevType
} from "tone";
import { Container, ControlsPaneLeft, ControlsPaneRight } from "./synthesizer.style"
import { AppSettingsProvider, TransportProvider } from "../../providers";
import { Envelope, Filter, Oscillator } from "./components";
import { Noise } from "./components/noise";
import { Reverb } from "./components/reverb";
import { Chebyshev } from "./components/chebyshev";
import { TransportControls } from "./components/transportControls"
import { Sequencer } from "../sequencer";
import { useCompressor } from "./synthesizer.hooks";

export const Synthesizer = () => {
	const { showControls } = useContext(AppSettingsProvider.Context);
	const { analyserRef: analyser, meterRef: meter } = useContext(TransportProvider.Context);
	const [oscillators, registerOscillators] = useState<Gain>();
	const [chebyshev, registerChebyshev] = useState<ChebyshevType>();
	const [envelope, registerEnvelope] = useState<AmplitudeEnvelope>();
	const [filter, registerFilter] = useState<FilterType>();
	const [noise, registerNoise] = useState<Gain>();
	const [reverb, registerReverb] = useState<Freeverb>();
	const [masterVolume, registerMasterVolume] = useState<Gain>();
	const compressor = useCompressor();
	const [isConnected, setIsConnected] = useState(false);


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
			analyser &&
			meter
		)) return;

		connect(oscillators, envelope);
		connect(noise, envelope);
		connect(envelope, chebyshev);
		connect(chebyshev, filter);
		connect(filter, reverb);
		connect(reverb, compressor);
		connect(compressor, masterVolume);
		connect(masterVolume, analyser);
		connect(masterVolume, meter);
		connect(masterVolume, Destination)

		setIsConnected(true);
		console.info("-> Tone connected")
	}, [
		meter,
		analyser,
		compressor,
		masterVolume,
		isConnected,
		setIsConnected,
		chebyshev,
		reverb,
		filter,
		envelope,
		oscillators,
		noise
	]);

	return (
		<Container isVisible={showControls}>
			<ControlsPaneLeft>
				<Oscillator register={registerOscillators} />
				<Envelope register={registerEnvelope} />
			</ControlsPaneLeft>
			<ControlsPaneRight>
				<TransportControls register={registerMasterVolume} />
				<Filter register={registerFilter} />
				<Noise register={registerNoise} />
				<Reverb register={registerReverb} />
				<Chebyshev register={registerChebyshev} />
			</ControlsPaneRight>
			<Sequencer />
		</Container>
	)
}