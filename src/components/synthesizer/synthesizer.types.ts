import { DefaultTheme, ThemeProps } from "styled-components";

export type RegisteredComponent<T> = {
	register: (component: T) => void;
}

export interface SynthTheme extends DefaultTheme {
	isSynthVisible: boolean;
}

export type SynthThemeProps = ThemeProps<SynthTheme>;