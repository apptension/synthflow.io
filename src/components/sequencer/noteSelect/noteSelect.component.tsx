import { Container, Select, Option, CurrentValue } from "./noteSelect.style";
import { NoteInputValue } from "./noteSelect.types";
import { NOTES } from "./noteSelect.constants";

type NoteInputProps = {
	value: NoteInputValue;
	onChange: (value: NoteInputValue) => void;
}

export const NoteSelect = ({ value, onChange }: NoteInputProps) => {
	return (
		<Container>
			<Select
				onChange={(event) => onChange(event.target.value as NoteInputValue)}
				value={value}
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
			<CurrentValue isNoteSelected={value !== "NULL"}>{value === "NULL" ? "" : value}</CurrentValue>
		</Container>
	)
}