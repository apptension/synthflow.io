import { useContext, useEffect, useMemo, useState } from "react";
import { RegisteredComponent } from "../../synthesizer.types";
import { useChebyshev } from "./chebyshev.hooks";
import { useRegister } from "../../synthesizer.hooks";
import { ControlsSection } from "../../../controlsSection";
import { Knob } from "../../../knob";
import { TransportProvider } from "../../../../providers";

export const Chebyshev = ({ register }: RegisteredComponent<any>) => {
	const chebyshev = useChebyshev();
	const { setConfig } = useContext(TransportProvider.Context);
	useRegister(register, chebyshev);
	const [order, setOrder] = useState(1);

	useEffect(() => {
		chebyshev?.set({
			order
		})

		setConfig(state => ({
			...state,
			chebyshev: order
		}))

		// should run on config values change
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [order])

	return useMemo(() => (
		<ControlsSection title="Chebyshev">
			<Knob label="Order" onChange={setOrder} value={order} normalRange={false} min={1} max={54} />
		</ControlsSection>
	),[order])
}