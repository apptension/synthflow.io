import { TransportContext } from "./transportProvider.context"
import { ReactNode, useEffect, useState } from "react";
import { not } from "ramda";
import { AmplitudeEnvelope, Loop, start, Transport } from "tone";
import { useAnalyser, useMeter } from "../../components/visualisation/analysers";

type TransportProviderProps = {
	children: ReactNode;
}

export const TransportProvider = ({ children }: TransportProviderProps) => {
	const analyser = useAnalyser();
	const meter = useMeter();

	const [isPlaying, setIsPlaying] = useState(false);
	const [triggerTime, setTriggerTime] = useState(0);
	const [currentBeat, setCurrentBeat] = useState(0);
	const [bpm, setBpm] = useState(90);
	const [currentBeatNotes, setCurrentBeatNotes] = useState<Array<string | null>>([null, null, null])
	const [envelopeRef, setEnvelopeRef] = useState<AmplitudeEnvelope | undefined>();

	useEffect(() => {
		if (isPlaying) {
			const loop = new Loop(time => {
				setCurrentBeat(beat => (beat + 1) % 8);
				setTriggerTime(time);
			}, "8n");

			loop.start(0);

			return () => {
				loop.dispose();
			}
		}
	}, [isPlaying]);

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
				currentBeatNotes,
				setCurrentBeatNotes,
				envelopeRef,
				setEnvelopeRef,
				analyserRef: analyser,
				meterRef: meter
			}}>
			{children}
		</TransportContext.Provider>
	)
}
