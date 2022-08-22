import { useField } from 'formik';

const RadioGroup = ({ label, options, ...props }) => {
	const [field, meta] = useField(props);
	//console.log('field', field);
	//console.log('meta', meta);

	const radios = options.map((option, index) => (
		<div key={index} className="form-check">
			<input
				className={
					meta.touched && meta.error
						? 'form-check-input is-invalid'
						: 'form-check-input'
				}
				{...props}
				{...field}
				id={`${field.name}${index}`}
				value={option}
				type="radio"
				checked={meta.value === option}
			/>
			<label htmlFor={`${field.name}${index}`} className="form-check-label">
				{option}
			</label>

			{index === options.length - 1 && meta.error && (
				<div className="invalid-feedback">{meta.error}</div>
			)}
		</div>
	));

	return (
		<>
			<p className="form-label">{label}</p>
			{radios}
		</>
	);
};

export default RadioGroup;
