import { useContext, useEffect, useState } from "react";
import {
	AmplitudeEnvelope,
	Compressor,
	connect,
	Destination,
	Filter as FilterType, Freeverb,
	Gain,
	Chebyshev as ChebyshevType
} from "tone";
import { Container, ControlsPane } from "./synthesizer.style"
import { AppSettingsProvider } from "../../providers";
import { Envelope, Filter, Oscillator } from "./components";
import { Noise } from "./components/noise";
import { Reverb } from "./components/reverb";
import { Chebyshev } from "./components/chebyshev";
import { TransportControls } from "./components/transportControls"

export const Synthesizer = () => {
	const { showControls } = useContext(AppSettingsProvider.Context);
	const [oscillators, registerOscillators] = useState<Compressor>();
	const [chebyshev, registerChebyshev] = useState<ChebyshevType>();
	const [envelope, registerEnvelope] = useState<AmplitudeEnvelope>();
	const [filter, registerFilter] = useState<FilterType>();
	const [noise, registerNoise] = useState<Gain>();
	const [reverb, registerReverb] = useState<Freeverb>();
	const [masterVolume, registerMasterVolume ] = useState<Gain>();
	const [isConnected, setIsConnected] = useState(false);

	useEffect(() => {
		if (isConnected) return;
		if (oscillators && envelope && filter && noise && reverb && chebyshev && masterVolume) {
			connect(oscillators, envelope);
			connect(noise, envelope);
			connect(envelope, chebyshev);
			connect(chebyshev, filter);
			connect(filter, reverb);
			connect(reverb, masterVolume);
			connect(masterVolume, Destination)

			setIsConnected(true);
			console.info("-> Tone connected")
		}
	}, [
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
			<ControlsPane>
				<Oscillator register={registerOscillators} />
				<Envelope register={registerEnvelope} />
			</ControlsPane>
			<ControlsPane>
				<TransportControls register={registerMasterVolume}/>
				<Filter register={registerFilter} />
				<Noise register={registerNoise} />
				<Reverb register={registerReverb} />
				<Chebyshev register={registerChebyshev} />
			</ControlsPane>
		</Container>
	)
}