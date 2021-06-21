import { useContext, useEffect, useState } from "react";
import { TransportProvider } from "../../../../providers";
import { ControlsSection } from "../../../controlsSection";
import { Knob } from "../../../knob";
import { Checkbox } from "../../../checkbox";
import { useMasterVolume } from "./transportControls.hooks";
import { RegisteredComponent } from "../../synthesizer.types";
import { Gain } from "tone";
import { useRegister } from "../../synthesizer.hooks";

export const TransportControls = ({ register }: RegisteredComponent<Gain>) => {
	const { toggleIsPlaying, isPlaying, bpm, setBpm } = useContext(TransportProvider.Context);
	const masterVolume = useMasterVolume();
	useRegister(register, masterVolume);
	const [volume, setVolume] = useState(1);

	useEffect(() => {
		masterVolume?.set({
			gain: volume
		})

		// should run on config values change
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [volume])

	return (
		<ControlsSection title="General">
			<Checkbox isChecked={isPlaying} onChange={toggleIsPlaying} label="On/Off" />
			<Knob label="BPM" onChange={setBpm} value={bpm} normalRange={false} max={250} min={30} />
			<Knob label="Master volume" onChange={setVolume} value={volume} />
		</ControlsSection>
	)
}