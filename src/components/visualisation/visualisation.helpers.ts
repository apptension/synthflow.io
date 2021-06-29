import { ConfigType } from "../../providers/transportProvider/transportProvider.types";
import { WaveTypes } from "../UI/waveTypeSelect/waveTypeSelect.types";

export const createOscRgb = ({ waveType, detune }: ConfigType["oscillator1"]) => {
	return {
		r: Number(waveType === WaveTypes.SIN) / 2 + detune / 1500.,
		g: Number(waveType === WaveTypes.SQUARE) / 3 + detune / 1500.,
		b: Number(waveType === WaveTypes.SAWTOOTH) / 4.5 + detune / 1500.,
	}
}
