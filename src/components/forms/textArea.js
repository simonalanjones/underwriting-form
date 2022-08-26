import { useField, Field } from 'formik';

const TextArea = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	// console.log('field', field);
	// console.log('props', props);
	return (
		<>
			<label className="form-label" htmlFor={props.id || props.name}>
				{label}
			</label>
			<Field
				as="textarea"
				className={
					meta.touched && meta.error
						? 'form-control is-invalid'
						: 'form-control'
				}
				id={field.name}
				{...field}
				{...props}
			></Field>
			{meta.touched && meta.error ? (
				<div className="invalid-feedback">{meta.error}</div>
			) : null}
		</>
	);
};

export default TextArea;
