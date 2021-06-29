import { Container, Select, Option } from "./select.style";

type SelectOption = { value: string, label: string };

type SelectComponentProps = {
	values: SelectOption[];
	value: string;
	onChange: (value: string) => void;
}

export const SelectComponent = ({ values, value, onChange }: SelectComponentProps) => {
	return (
		<Container>
			<Select
				onChange={(event) => onChange(event.target.value)}
				value={value}
			>
				{values.map(({ value, label }) => (
					<Option value={value} key={value}>{label}</Option>
				))}
			</Select>
		</Container>
	)
}