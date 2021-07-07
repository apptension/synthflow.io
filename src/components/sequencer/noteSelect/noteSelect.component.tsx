import { Container, Select, Option } from "./noteSelect.style";
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