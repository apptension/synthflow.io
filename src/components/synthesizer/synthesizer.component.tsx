import { Knob } from "../knob"
import { Container } from "./synthesizer.style"
import { WaveTypeSelect } from "../waveTypeSelect";
import { Checkbox } from "../checkbox";

export const Synthesizer = () => {
	return (
		<Container>
			<Checkbox
				isChecked={true}
				label="Reverb"
				onChange={() => undefined}
			/>
			<Checkbox
				isChecked={false}
				label="Distortion"
				onChange={() => undefined}
			/>
			<WaveTypeSelect label="Wave form" onChange={(value) => console.log(value)} />
			<Knob label="Attack" onChange={() => undefined} defaultValue={100} />
			<Knob label="Release" max={200} onChange={() => undefined} step={2} defaultValue={140} />
			<Knob label="Delay" max={1200} min={-245} onChange={() => undefined} step={10} defaultValue={0} />
		</Container>
	)
}