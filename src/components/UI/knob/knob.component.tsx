import { useCallback, useEffect, useState } from "react";
import { Container, Svg, SvgBackgroundCircle, SvgCircle, Input } from "./knob.style";
import { CIRCUMFERENCE, RADIUS } from "./knob.constants";
import { Label } from "../../../theme/shared.style";
import { roundTo2Decimal } from "../../../utils";

type KnobProps = {
	onChange: (value: number) => void;
	value: number;
	max?: number;
	min?: number;
	label: string;
	step?: number;
	normalRange?: boolean
}

export const Knob = ({ max = 1, min = 0, label, onChange, step = 1, value, normalRange = true }: KnobProps) => {
	const [strokeOffset, setStrokeOffset] = useState(CIRCUMFERENCE);
	const [isDragging, setIsDragging] = useState(false);
	const [dragOffset, setDragOffset] = useState<number>(0);

	useEffect(() => {
		handleChange(value);
		// should run only on mount
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value])

	const handleChange = useCallback((value: number) => {
		if (value > max || value < min) return;
		onChange(normalRange ? roundTo2Decimal(value) : value);

		const offset = CIRCUMFERENCE - ((value - min) * 100) / (max - min) / 100 * CIRCUMFERENCE;
		setStrokeOffset(offset);
	}, [onChange, setStrokeOffset, max, min, normalRange]);

	const onDrag = useCallback((event: MouseEvent) => {
		if (!isDragging) return;

		const diff = dragOffset - (event.clientX);
		setDragOffset(event.clientX)

		if (Math.abs(diff) > 10) return;

		const normalizedDiff = normalRange ? diff / 100 : diff;
		handleChange(value + normalizedDiff * -1);
	}, [isDragging, dragOffset, handleChange, value, normalRange])

	const handleDragChange = useCallback((event: MouseEvent | any, value: boolean) => {
		document.body.style.cursor = value ? "ew-resize" : "default";

		setDragOffset(0);
		setIsDragging(value);
	}, [setDragOffset, setIsDragging])

	useEffect(() => {
		document.addEventListener("mouseup", (event) => handleDragChange(event, false), false);
		document.addEventListener("mousemove", onDrag, false);

		return () => {
			document.removeEventListener("mouseup", (event) => handleDragChange(event, false), false);
			document.removeEventListener("mousemove", onDrag, false);
		}
	}, [handleDragChange, onDrag])

	return (
		<Container>
			<Label htmlFor={label}>
				{label}
			</Label>
			<Svg onMouseDown={(event) => handleDragChange(event, true)}>
				<SvgCircle r={`${RADIUS / 10}rem`} cx="2.55rem" cy="2.55rem" strokeDasharray={CIRCUMFERENCE} strokeDashoffset={strokeOffset} />
				<SvgBackgroundCircle r={`${RADIUS / 10}rem`} cx="2.55rem" cy="2.55rem" />
			</Svg>
			<Input
				value={value}
				name={label}
				type="number"
				step={normalRange ? 0.1 : step}
				min={min}
				max={max}
				onChange={(event) => {
					const value = event.target.valueAsNumber;
					handleChange(isNaN(value) ? min : value)
				}
				}
			/>
		</Container>
	)
};