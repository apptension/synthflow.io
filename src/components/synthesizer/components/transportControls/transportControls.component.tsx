import { useContext } from "react";
import { TransportProvider } from "../../../../providers";
import { ControlsSection } from "../../../controlsSection";
import { Knob } from "../../../knob";
import { Checkbox } from "../../../checkbox";

export const TransportControls = () => {
	const { toggleIsPlaying, isPlaying, bpm, setBpm } = useContext(TransportProvider.Context);

	return (
		<ControlsSection title="General">
			<Checkbox isChecked={isPlaying} onChange={toggleIsPlaying} label="On/Off" />
			<Knob label="BPM" onChange={setBpm} value={bpm} normalRange={false} max={250} min={30}/>
		</ControlsSection>
	)
}