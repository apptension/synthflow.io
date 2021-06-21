import { RegisteredComponent } from "../../synthesizer.types";
import { Freeverb } from "tone";
import { useReverb } from "./reverb.hooks";
import { useEffect, useState } from "react";
import { ControlsSection } from "../../../controlsSection";
import { Knob } from "../../../knob";
import { useRegister } from "../../synthesizer.hooks";

export const Reverb = ({ register }: RegisteredComponent<Freeverb>) => {
	const reverb = useReverb();
	useRegister(register, reverb);

	const [room, setRoom] = useState(0.1);

	useEffect(() => {
		reverb?.set({
			roomSize: room,
		})

		// should run on config values change
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [room]);

	return (
		<ControlsSection title="Reverb">
			<Knob label="Room" onChange={setRoom} value={room} />
		</ControlsSection>
	)
}

