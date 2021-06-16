import { useCallback, useEffect, useState } from "react";
import { Container, Svg, SvgBackgroundCircle, SvgCircle, Input } from "./knob.style";
import { CIRCUMFERENCE, RADIUS } from "./knob.constants";
import { Label } from "../../theme/shared.style";

type KnobProps = {
	max?: number;
	min?: number;
	defaultValue?: number;
	label: string;
	onChange: (value: number) => void;
	step?: number;
}

export const Knob = ({ max = 100, min = 0, label, defaultValue = min, onChange, step = 1 }: KnobProps) => {
	const [value, setValue] = useState(defaultValue);
	const [strokeOffset, setStrokeOffset] = useState(CIRCUMFERENCE);
	const [isDragging, setIsDragging] = useState(false);
	const [dragOffset, setDragOffset] = useState<number>(0);
	const [dragInitialOffset, setDragInitialOffset] = useState<number>(0);

	useEffect(() => {
		handleChange(defaultValue);
		// should run only on mount
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleChange = useCallback((value: number) => {
		if (value > max || value < min) return;
		setValue(value);
		onChange(value);

		const offset = CIRCUMFERENCE - ((value - min) * 100) / (max - min) / 100 * CIRCUMFERENCE;
		setStrokeOffset(offset);
	}, [onChange, setValue, setStrokeOffset, max, min]);

	const onDrag = useCallback((event: MouseEvent) => {
		if (!isDragging) return;

		const diff = dragOffset - (event.clientX - dragInitialOffset);
		setDragOffset(event.clientX - dragInitialOffset)

		const limitValue = (value: number) => {
			if (value < 0) {
				return -step
			} else {
				return step;
			}
		}

		handleChange(value + limitValue(diff) * -1);
	}, [isDragging, dragInitialOffset, dragOffset, handleChange, value, step])

	const handleDragChange = (event: MouseEvent | any, value: boolean) => {
		document.body.style.cursor = value ? "ew-resize" : "default";

		setIsDragging((state) => {
			!state ? setDragInitialOffset(event.clientX) : setDragInitialOffset(0);
			return value;
		});
	}

	useEffect(() => {
		document.addEventListener("mouseup", (event) => handleDragChange(event, false), false);
		document.addEventListener("mousemove", onDrag, false);

		return () => {
			document.removeEventListener("mouseup", (event) => handleDragChange(event, false), false);
			document.removeEventListener("mousemove", onDrag, false);
		}
	}, [onDrag])

	return (
		<Container>
			<Label htmlFor={label}>
				{label}
			</Label>
			<Svg onMouseDown={(event) => handleDragChange(event, true)}>
				<SvgCircle r={RADIUS} cx="13" cy="13" strokeDasharray={CIRCUMFERENCE} strokeDashoffset={strokeOffset} />
				<SvgBackgroundCircle r={RADIUS} cx="13" cy="13" />
			</Svg>
			<Input
				value={value}
				name={label}
				type="number"
				step={step}
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