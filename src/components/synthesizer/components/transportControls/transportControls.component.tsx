import { useContext, useEffect, useMemo, useState } from "react";
import { TransportProvider } from "../../../../providers";
import { ControlsSection } from "../../../UI/controlsSection";
import { Knob } from "../../../UI/knob";
import { Checkbox } from "../../../UI/checkbox";
import { useMasterVolume } from "./transportControls.hooks";
import { RegisteredComponent } from "../../synthesizer.types";
import { Gain } from "tone";
import { useRegister } from "../../synthesizer.hooks";

export const TransportControls = ({ register }: RegisteredComponent<Gain>) => {
	const masterVolume = useMasterVolume();
	useRegister(register, masterVolume);

	const { toggleIsPlaying, isPlaying, bpm, setBpm, setConfig } = useContext(TransportProvider.Context);

	const [volume, setVolume] = useState(1);

	useEffect(() => {
		masterVolume?.set({
			gain: volume
		});

		setConfig(state => ({
			...state,
			masterVolume: volume
		}))

		// should run on config values change
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [volume])

	return useMemo(() => (
		<ControlsSection title="General">
			<Checkbox label="On/Off" isChecked={isPlaying} onChange={toggleIsPlaying} />
			<Knob label="BPM" onChange={setBpm} value={bpm} normalRange={false} max={350} min={30} />
			<Knob label="Master volume" onChange={setVolume} value={volume} />
		</ControlsSection>

		// eslint-disable-next-line react-hooks/exhaustive-deps
	), [isPlaying, bpm, volume])
}