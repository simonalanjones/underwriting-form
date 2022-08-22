import { useRef, useEffect } from 'react';

export default function DependantCheck({ callback, checked }) {
	const checkbox1 = useRef();
	const checkbox2 = useRef();

	// can pre-check the checkboxes if in checked param
	useEffect(() => {
		checkbox1.current.checked = checked;
		checkbox2.current.checked = checked;
	}, [checked]);

	// return a truth value based on both checkboxes checked
	const handleChange = (e) => {
		callback(checkbox1.current.checked && checkbox2.current.checked);
	};

	return (
		<div className="alert alert-warning" role="alert">
			<small>READ TO SUBSCRIBER:</small>
			<br />
			Do you have the permission of this dependant to disclose their medical
			history?&nbsp;
			<input
				ref={checkbox1}
				type="checkbox"
				className="form-check-input"
				onChange={handleChange}
				data-testid="firstDisclaimerCheckboxDependant"
			/>
			<br />
			Do you have full knowledge of their medical history?&nbsp;
			<input
				ref={checkbox2}
				type="checkbox"
				className="form-check-input"
				onChange={handleChange}
				data-testid="secondDisclaimerCheckboxDependant"
			/>
			<br />
		</div>
	);
}
