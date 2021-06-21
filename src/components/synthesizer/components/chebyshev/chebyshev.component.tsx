import { RegisteredComponent } from "../../synthesizer.types";
import { useChebyshev } from "./chebyshev.hooks";
import { useRegister } from "../../synthesizer.hooks";
import { ControlsSection } from "../../../controlsSection";
import { Knob } from "../../../knob";
import { useEffect, useState } from "react";

export const Chebyshev = ({ register }: RegisteredComponent<any>) => {
	const chebyshev = useChebyshev();
	useRegister(register, chebyshev);
	const [order, setOrder] = useState(1);

	useEffect(() => {
		chebyshev?.set({
			order
		})

		// should run on config values change
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [order])

	return (
		<ControlsSection title="Chebyshev">
			<Knob label="Order" onChange={setOrder} value={order} normalRange={false} min={1} max={54} />
		</ControlsSection>
	)
}