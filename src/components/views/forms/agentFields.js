import React, { useState, useEffect, useRef } from 'react';
import RadioOptions from '../../../common/radioOptions';

function AgentFields(props) {
	const formRef = useRef();
	const handleCancel = props.handleCancel;
	const handleSubmit = props.handleSubmit;
	// can we pass our own in for testing purposes
	// and then verify in tests that the buttons work?!
	// can test editing of field using test data
	// can test class changes if incorrect data submitted

	const [fields, setFields] = useState({
		agentName: {
			name: 'agentName',
			class: 'form-control',
			error: '',
			tvalue: props.data.name !== undefined ? props.data.name : '',
		},
		agentEmail: {
			name: 'agentEmail',
			class: 'form-control',
			error: '',
			tvalue: props.data.email !== undefined ? props.data.email : '',
		},
		agentDept: {
			name: 'agentDept',
			class: 'form-check-input',
			error: '',
			tvalue: props.data.dept !== undefined ? props.data.dept : '',
		},
	});

	const [submitted, setSubmitted] = useState(false);

	const validateField = (fieldName, fieldValue) => {
		switch (fieldName) {
			case 'agentName':
				// multiple rules - required field, greater than 5 chars etc
				const agentNameValid =
					fieldValue !== undefined && fieldValue.length > 2;
				return agentNameValid ? null : 'too short agent name';

			case 'agentEmail':
				const agentEmailValid =
					fieldValue !== undefined && fieldValue.length > 5;
				return agentEmailValid ? null : 'too short agent email';

			case 'agentDept':
				const agentDeptValid =
					fieldValue !== undefined && fieldValue !== null && fieldValue !== '';
				return agentDeptValid ? null : 'agent dept is required';

			default:
				console.log('waaaat?');
				return null;
		}
	};

	const submitForm = () => {
		setSubmitted(true);
		let _fields = {};
		for (const [fieldName, fieldValue] of Object.entries(fields)) {
			const errorMessage = validateField(fieldName, fieldValue.tvalue);
			const updatedField = { ...fieldValue, error: errorMessage };
			_fields[fieldName] = updatedField;
		}
		setFields(_fields);
	};

	const handleChange = (e) => {
		let _fields = fields;
		_fields[e.target.name]['tvalue'] = e.target.value;
		setFields({ ..._fields });
	};

	// todo: this gets called every key press, convert to side-effect?
	const fieldClassFor = (field) => {
		if (submitted === false) {
			return fields[field].class;
		} else {
			if (fields[field].error) {
				return `${fields[field].class} is-invalid`;
			} else {
				return `${fields[field].class} is-valid`;
			}
		}
	};

	// Handle inital submit, checking validation
	// before passing up to submit in parent component
	function submitHandler(event) {
		event.preventDefault();
		event.stopPropagation();
		submitForm();
	}

	useEffect(() => {
		if (submitted === true) {
			if (
				!fields.agentName.error &&
				!fields.agentEmail.error &&
				!fields.agentDept.error
			) {
				const submitFields = {
					agentName: fields.agentName.tvalue,
					agentEmail: fields.agentEmail.tvalue,
					agentDept: fields.agentDept.tvalue,
				};
				handleSubmit(submitFields);
			}
		}
	}, [
		submitted,
		fields.agentName.error,
		fields.agentEmail.error,
		fields.agentDept.error,
		fields,
		handleSubmit,
	]);

	const style = {
		width: '100%',
		maxWidth: 500,
	};

	return (
		<form
			onSubmit={submitHandler}
			ref={formRef}
			className="p-4 p-md-5 border rounded-3 bg-white shadow-sm mx-auto"
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
					className={fieldClassFor('agentName')}
					id="agentName"
					value={fields.agentName.tvalue}
					onChange={handleChange}
					required
				/>

				{fields.agentName.error && (
					<div
						data-testid="invalid-feedback-agent-name"
						className="invalid-feedback"
					>
						{fields.agentName.error}
					</div>
				)}
			</div>
			<div className="mb-4">
				<label htmlFor="agentEmail" className="form-label">
					Agent email
				</label>

				<input
					type="input"
					name="agentEmail"
					className={fieldClassFor('agentEmail')}
					id="agentEmail"
					value={fields.agentEmail.tvalue}
					onChange={handleChange}
					required
				/>
				{fields.agentEmail.error && (
					<div
						data-testid="invalid-feedback-agent-email"
						className="invalid-feedback"
					>
						{fields.agentEmail.error}
					</div>
				)}
			</div>
			<div className="mb-5">
				<label htmlFor="agentDept" className="form-label">
					Agent dept
				</label>

				<div className="form-group">
					<RadioOptions
						name="agentDept"
						changeHandler={handleChange}
						value={fields.agentDept.tvalue}
						options={['Retention', 'Acquisition']}
						checkedItem={fields.agentDept.tvalue}
						required={true}
						className={fieldClassFor('agentDept')}
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
