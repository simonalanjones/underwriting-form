import { useField, Field } from 'formik';

const SelectOptions = ({ label, options, ...props }) => {
	const [field, meta] = useField(props);

	const choices = options.map((option, index) => (
		<option key={index} value={option}>
			{option}
		</option>
	));

	return (
		<>
			<label htmlFor={field.name} className="form-label">
				{label}
			</label>
			<Field
				className={
					meta.touched && meta.error ? 'form-select is-invalid' : 'form-select'
				}
				as="select"
				id={props.name}
				name={props.name}
			>
				<option value="">Select an option</option>
				{choices}
			</Field>
			{meta.touched && meta.error ? (
				<div className="invalid-feedback">{meta.error}</div>
			) : null}
		</>
	);
};

export default SelectOptions;
