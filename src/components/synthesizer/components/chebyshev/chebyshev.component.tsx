import { useContext, useEffect, useMemo, useState } from "react";
import { RegisteredComponent } from "../../synthesizer.types";
import { useChebyshev } from "./chebyshev.hooks";
import { useRegister } from "../../synthesizer.hooks";
import { ControlsSection } from "../../../UI/controlsSection";
import { Knob } from "../../../UI/knob";
import { TransportProvider } from "../../../../providers";
import { useUrlParams } from "../../../../hooks";
import { UrlConfigKeys } from "../../../../hooks/useUrlParams/useUrlParams.types";

export const Chebyshev = ({ register }: RegisteredComponent<any>) => {
	const chebyshev = useChebyshev();
	const { setConfig } = useContext(TransportProvider.Context);
	useRegister(register, chebyshev);
	const [order, setOrder] = useState(1);
	useUrlParams({
		[UrlConfigKeys.CHEBYSHEV]: { value: order, setter: setOrder },
	});
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
		<ControlsSection title="Chebyshev" isShort>
			<Knob label="Order" onChange={setOrder} value={order} normalRange={false} min={1} max={54} />
		</ControlsSection>
	),[order])
}