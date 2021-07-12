import { SEQUENCER_PATTERNS } from "./sequencer.constants";

const getRandomInt = (max: number) => {
	return Math.floor(Math.random() * max);
}

export const getRandomPreset = (omittedPreset: string) => {
	const patterns = Object.keys(SEQUENCER_PATTERNS);
	const filteredPatterns = patterns.filter((preset) => preset !== omittedPreset && preset !== "CUSTOM");
	const index = getRandomInt(filteredPatterns.length - 1);

	return filteredPatterns[index];
}