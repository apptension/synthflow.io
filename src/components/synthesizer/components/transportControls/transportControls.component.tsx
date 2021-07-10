import { useContext, useEffect, useMemo, useState } from "react";
import { TransportProvider } from "../../../../providers";
import { ControlsSection } from "../../../UI/controlsSection";
import { Knob } from "../../../UI/knob";
import { useMasterVolume } from "./transportControls.hooks";
import { RegisteredComponent } from "../../synthesizer.types";
import { Gain } from "tone";
import { useRegister } from "../../synthesizer.hooks";
import { useUrlParams } from "../../../../hooks";
import { UrlConfigKeys } from "../../../../hooks/useUrlParams/useUrlParams.types";

export const TransportControls = ({ register }: RegisteredComponent<Gain>) => {
	const masterVolume = useMasterVolume();
	useRegister(register, masterVolume);

	const { isPlaying, bpm, setBpm, setConfig } = useContext(TransportProvider.Context);
	const [volume, setVolume] = useState(1);

	useUrlParams({
		[UrlConfigKeys.BPM]: { value: bpm, setter: setBpm },
		[UrlConfigKeys.MASTER]: { value: volume, setter: setVolume }
	});

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
		<ControlsSection>
			<Knob label="Master volume" onChange={setVolume} value={volume} />
			<Knob label="BPM" onChange={setBpm} value={bpm} normalRange={false} max={350} min={30} />
		</ControlsSection>

		// eslint-disable-next-line react-hooks/exhaustive-deps
	), [isPlaying, bpm, volume])
}