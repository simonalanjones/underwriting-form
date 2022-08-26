import React from 'react';
import { useField } from 'formik';

const TextInput = React.forwardRef((props, ref) => {
	const [field, meta] = useField(props);
	return (
		<>
			<label className="form-label" htmlFor={props.id || props.name}>
				{props.label}
			</label>
			<input
				ref={ref}
				className={
					meta.touched && meta.error
						? 'form-control is-invalid'
						: 'form-control'
				}
				id={field.name}
				{...field}
				{...props}
			/>
			{meta.touched && meta.error ? (
				<div className="invalid-feedback">{meta.error}</div>
			) : null}
		</>
	);
});

export default TextInput;
