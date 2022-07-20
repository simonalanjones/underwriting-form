import { useRef } from 'react';

export default function DependantCheck({ callback }) {
	const checkbox1 = useRef();
	const checkbox2 = useRef();

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
			/>
			<br />
			Do you have full knowledge of their medical history?&nbsp;
			<input
				ref={checkbox2}
				type="checkbox"
				className="form-check-input"
				onChange={handleChange}
			/>
			<br />
		</div>
	);
}
