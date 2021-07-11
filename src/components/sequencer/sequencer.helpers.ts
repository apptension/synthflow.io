import { SEQUENCER_PATTERNS } from "./sequencer.constants";

const getRandomInt = (max: number) => {
	return Math.floor(Math.random() * max);
}

export const getRandomPreset = (currentPreset: string) => {
	const patterns = Object.keys(SEQUENCER_PATTERNS);
	const filteredPatterns = patterns.filter((preset) => preset !== currentPreset && preset !== "CUSTOM");
	const index = getRandomInt(filteredPatterns.length - 1);

	return filteredPatterns[index];
}