import { INITIAL_TRANSPORT_CONFIG, TransportContext } from "./transportProvider.context"
import { ReactNode, useEffect, useState } from "react";
import { not } from "ramda";
import { AmplitudeEnvelope, Draw, Loop, start, Transport } from "tone";
import { AvailableBeats } from "./transportProvider.types";

type TransportProviderProps = {
	children: ReactNode;
}

export const TransportProvider = ({ children }: TransportProviderProps) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [config, setConfig] = useState(INITIAL_TRANSPORT_CONFIG)
	const [triggerTime, setTriggerTime] = useState(0);
	const [currentBeat, setCurrentBeat] = useState(0);
	const [bpm, setBpm] = useState(90);
	const [currentBeatNotes, setCurrentBeatNotes] = useState<Array<string | null>>([null, null, null])
	const [envelopeRef, setEnvelopeRef] = useState<AmplitudeEnvelope | undefined>();
	const [beats, setBeats] = useState<AvailableBeats>(8);

	useEffect(() => {
		let loop: Loop | undefined;
		if (isPlaying) {
			loop = new Loop(time => {
				Draw.schedule(() => {
					setCurrentBeat(beat => (beat + 1) % beats);
				}, time)
				setTriggerTime(time);
			}, "8n");

			loop.start(0);
		} else {
			loop?.dispose();
		}

		return () => {
			loop?.dispose();
		}
	}, [isPlaying, beats]);

	useEffect(() => {
		Transport.bpm.set({
			value: bpm
		})
	}, [bpm])

	useEffect(() => {
		if (isPlaying) {
			start().then(() => {
				Transport.start();
			});
		} else {
			Transport.stop();
		}
	}, [isPlaying])

	const toggleIsPlaying = () => {
		setIsPlaying(not);
	}

	return (
		<TransportContext.Provider
			value={{
				isPlaying,
				toggleIsPlaying,
				triggerTime,
				bpm,
				setBpm,
				currentBeat,
				setCurrentBeat,
				currentBeatNotes,
				setCurrentBeatNotes,
				envelopeRef,
				setEnvelopeRef,
				config,
				setConfig,
				beats,
				setBeats
			}}>
			{children}
		</TransportContext.Provider>
	)
}
