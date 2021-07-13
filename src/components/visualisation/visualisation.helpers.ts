import { OscillatorConfig } from "../../providers/transportProvider/transportProvider.types";
import { WaveTypes } from "../UI/waveTypeSelect/waveTypeSelect.types";
import Color  from 'color';

export const createOscRgb = ({ waveType, detune }: OscillatorConfig) => {
	return {
		r: Number(waveType === WaveTypes.SIN) / 2 + detune / 1500.,
		g: Number(waveType === WaveTypes.SQUARE) / 3 + detune / 1500.,
		b: Number(waveType === WaveTypes.SAWTOOTH) / 4.5 + detune / 1500.,
	}
}

export const setBlobThemeColors = (color1: Uint8Array) => {
	const root = document.documentElement;
	const color = Color.rgb(color1);
	const finalColor = color.isDark() ? color.lightness(70) : color;

	root.style.setProperty("--themeColorLight", finalColor.desaturate(0.1).toString());
	root.style.setProperty("--themeColorHighlight", finalColor.lighten(0.15).toString())
}