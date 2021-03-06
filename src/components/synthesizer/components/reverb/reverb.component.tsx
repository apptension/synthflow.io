import { useContext, useEffect, useMemo, useState } from "react";
import { Freeverb } from "tone";
import { RegisteredComponent } from "../../synthesizer.types";
import { useReverb } from "./reverb.hooks";
import { ControlsSection } from "../../../UI/controlsSection";
import { Knob } from "../../../UI/knob";
import { useRegister } from "../../synthesizer.hooks";
import { TransportProvider } from "../../../../providers";
import { useUrlParams } from "../../../../hooks";
import { UrlConfigKeys } from "../../../../hooks/useUrlParams/useUrlParams.types";

export const Reverb = ({ register }: RegisteredComponent<Freeverb>) => {
	const reverb = useReverb();
	useRegister(register, reverb);

	const { setConfig } = useContext(TransportProvider.Context);
	const [room, setRoom] = useState(0.1);

	useUrlParams({
		[UrlConfigKeys.REVERB]: { value: room, setter: setRoom },
	});

	useEffect(() => {
		reverb?.set({
			roomSize: room,
		})

		setConfig(state => ({
			...state,
			reverb: room
		}))

		// should run on config values change
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [room]);

	return useMemo(() => (
		<ControlsSection title="Reverb" isShort>
			<Knob label="Room" onChange={setRoom} value={room} />
		</ControlsSection>
	), [room])
}

