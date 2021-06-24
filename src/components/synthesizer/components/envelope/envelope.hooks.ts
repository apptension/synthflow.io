import { useContext, useEffect, useRef } from "react";
import { AmplitudeEnvelope } from "tone";
import { TransportProvider } from "../../../../providers";

export const useEnvelope = () => {
	const envelope = useRef<AmplitudeEnvelope>();
	const { triggerTime, setEnvelopeRef } = useContext(TransportProvider.Context);

	useEffect(() => {
		envelope.current = new AmplitudeEnvelope({
			attack: 0.2,
			release: 0.1,
			sustain: 0,
			decay: 0.01,
			attackCurve: "exponential",
			decayCurve: "exponential"
		})

		setEnvelopeRef(envelope.current)

		// should run only on mount
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (triggerTime) {
			envelope?.current?.triggerAttackRelease("16n", triggerTime)
		}
	}, [triggerTime]);

	return envelope.current;
}