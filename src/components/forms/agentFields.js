import React, { useState, useEffect, useRef } from 'react';
import RadioOptions from '../common/radioOptions';

function AgentFields(props) {
	const formRef = useRef();
	const handleCancel = props.handleCancel;
	const handleSubmit = props.handleSubmit;

	const [fields, setFields] = useState({
		agentName: '',
		agentEmail: '',
		agentDept: '',
	});

	// Handle inital submit, checking validation
	// before passing up to submit in parent component
	function submitHandler(event) {
		event.preventDefault();
		event.stopPropagation();
		formRef.current.classList.add('was-validated');
		if (formRef.current.checkValidity()) {
			/* callback passed through parent component props */
			handleSubmit(fields);
		}
	}

	// handle incoming prop data, one-time use
	useEffect(() => {
		if (props.data) {
			setFields({
				agentName: props.data.name !== undefined ? props.data.name : '',
				agentEmail: props.data.email !== undefined ? props.data.email : '',
				agentDept: props.data.dept !== undefined ? props.data.dept : '',
			});
		}
	}, [props.data]);

	const handleChange = (e) => {
		setFields({
			...fields,
			[e.target.name]: e.target.value,
		});
	};

	const style = {
		width: '100%',
		maxWidth: 500,
	};

	return (
		<form
			onSubmit={submitHandler}
			ref={formRef}
			className="needs-validation p-4 p-md-5 border rounded-3 bg-white shadow-sm mx-auto"
			noValidate
			autoComplete="off"
			style={style}
		>
			<div className="mb-4">
				<label htmlFor="agentName" className="form-label">
					Agent name
				</label>

				<input
					type="input"
					name="agentName"
					className="form-control"
					id="agentName"
					value={fields.agentName}
					onChange={handleChange}
					required
				/>
				<div className="invalid-feedback">Required field</div>
			</div>
			<div className="mb-4">
				<label htmlFor="agentEmail" className="form-label">
					Agent email
				</label>

				<input
					type="input"
					name="agentEmail"
					className="form-control"
					id="agentEmail"
					value={fields.agentEmail}
					onChange={handleChange}
					required
				/>
				<div className="invalid-feedback">Required field</div>
			</div>
			<div className="mb-5">
				<label htmlFor="agentDept" className="form-label">
					Agent dept
				</label>

				<div className="form-group">
					<RadioOptions
						name="agentDept"
						changeHandler={handleChange}
						value={fields.agentDept}
						options={['Retention', 'Acquisition']}
						checkedItem={fields.agentDept}
						required={true}
					/>
				</div>
			</div>
			<button type="submit" className="btn btn-primary">
				{!props.data ? 'Submit' : 'Update'}
			</button>
			&nbsp;
			{props.data && (
				<button
					type="submit"
					onClick={handleCancel}
					className="btn btn-secondary"
				>
					Cancel
				</button>
			)}
		</form>
	);
}

export default AgentFields;
