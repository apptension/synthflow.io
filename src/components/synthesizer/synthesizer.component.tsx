import { Knob } from "../knob"
import { Container } from "./synthesizer.style"

export const Synthesizer = () => {
	return (
		<Container>
			<Knob label="Attack"/>
			<Knob label="Release" max={200}/>
			<Knob label="Delay" max={1200} min={-245}/>
		</Container>
	)
}