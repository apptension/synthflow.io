export const roundTo2Decimal = (value: number) => {
	return Math.round((value + Number.EPSILON) * 100) / 100;
};
