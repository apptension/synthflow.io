import { useEffect, useState } from "react";
import { RegisteredComponent } from "./synthesizer.types";

export const useRegister = <T>(register: RegisteredComponent<T>["register"], synthComponent: T | undefined) => {
	const [isRegistered, setRegistered] = useState(false);

	useEffect(() => {
		if (!synthComponent || isRegistered) return;
		register(synthComponent);
		setRegistered(true);
	}, [synthComponent, isRegistered, setRegistered, register])
}