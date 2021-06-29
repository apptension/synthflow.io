import { Container, Indicator, Input, Label } from "./checkbox.style"
import { SharedStyles } from "../../../theme";

type CheckboxProps = {
	isChecked: boolean;
	onChange: () => void;
	label: string;
}

export const Checkbox = ({ isChecked, onChange, label }: CheckboxProps) => {
	return (
		<Container>
			<SharedStyles.Label>
				{label}
			</SharedStyles.Label>
			<Label>
				<Input name="checkbox" type="checkbox" checked={isChecked} onChange={onChange} />
				<Indicator />
			</Label>
		</Container>
	)

}