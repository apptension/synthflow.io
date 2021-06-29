import { ConfigType } from "../../providers/transportProvider/transportProvider.types";

export type Rgb = {
	r: number;
	g: number;
	b: number;
}

export type VisualisationConfig = {
	isPlaying: number;
	bpm: number;
	zoom: number;
} & Omit<ConfigType, "oscillator1" | "oscillator2"> & {
	oscillator1: Rgb
	oscillator2: Rgb
}