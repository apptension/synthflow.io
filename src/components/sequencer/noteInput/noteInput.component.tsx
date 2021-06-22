import { Container, Select, Option } from "./noteInput.style";

const NOTES: NoteInputValue[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "NULL"];
export type NoteType = "C" | "C#" | "D" | "D#" | "E" | "F" | "F#" | "G" | "G#" | "A" | "A#" | "B";

export type NoteInputValue = NoteType | "NULL";

type NoteInputProps = {
	value: NoteInputValue;
	onChange: (value: NoteInputValue) => void;
}

export const NoteInput = ({ value, onChange }: NoteInputProps) => {
	return (
		<Container>
			<Select
				onChange={(event) => onChange(event.target.value as NoteInputValue)}
				value={value}
				isNoteSelected={value !== "NULL"}
			>
				{NOTES.map((value) => {
						return value === "NULL" ? (
							<Option value={value} key={value}> </Option>
						) : (
							<Option value={value} key={value}>{value}</Option>
						);
					}
				)}
			</Select>
		</Container>
	)
}