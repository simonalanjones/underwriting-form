import React, { useState, useEffect, useRef } from 'react';
import RadioOptions from '../../../common/radioOptions';

function AgentFields(props) {
	const formRef = useRef();
	const handleCancel = props.handleCancel;
	const handleSubmit = props.handleSubmit;

	const [fields, setFields] = useState({
		agentName: {
			name: 'agentName',
			type: 'input',
			class: 'form-control',
			error: '',
			tvalue: '',
		},
		agentEmail: {
			name: 'agentEmail',
			type: 'input',
			class: 'form-control',
			error: '',
			tvalue: '',
		},
		agentDept: {
			name: 'agentDept',
			type: 'radio',
			class: 'form-check-input',
			error: '',
			tvalue: '',
		},
	});

	const [populated, setPopulated] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [isValid, setIsValid] = useState(false);

	// prepopulate form fields if data passed
	useEffect(() => {
		if (
			props.data !== undefined &&
			Object.keys(props.data).length > 0 &&
			populated === false
		) {
			const _fields = {};
			for (const [fieldName, fieldValue] of Object.entries(fields)) {
				const updatedField = {
					...fieldValue,
					tvalue: props.data[fieldName],
				};

				_fields[fieldName] = updatedField;
			}

			setPopulated(true);
			setFields(_fields);
		}
	}, [fields, props.data, populated]);

	useEffect(() => {
		if (submitted === true && isValid === true) {
			const agent = {
				agentName: fields.agentName.tvalue,
				agentEmail: fields.agentEmail.tvalue,
				agentDept: fields.agentDept.tvalue,
			};

			handleSubmit(agent);
		}
	}, [submitted, isValid, fields, handleSubmit]);

	const submitForm = () => {
		validateForm();
		setSubmitted(true);
	};

	const validateForm = () => {
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
						fieldValue !== undefined &&
						fieldValue !== null &&
						fieldValue !== '';
					return agentDeptValid ? null : 'agent dept is required';

				default:
					console.log('unknown fieldname:', fieldName);
					return null;
			}
		};

		// helper
		const classForFieldType = (field) => {
			if (field === 'radio') {
				return 'form-check-input';
			} else if (field === 'input') {
				return 'form-control';
			}
		};

		let _isValid = true;
		const _fields = {};
		for (const [fieldName, fieldValue] of Object.entries(fields)) {
			const error = validateField(fieldName, fieldValue.tvalue);

			let fieldClass;
			const ftype = classForFieldType(fields[fieldName].type);

			if (error) {
				fieldClass = `${ftype} is-invalid`;
				_isValid = false;
			} else {
				fieldClass = `${ftype} is-valid`;
			}

			const updatedField = {
				...fieldValue,
				error: error,
				class: fieldClass,
			};
			_fields[fieldName] = updatedField;
		}
		setIsValid(_isValid);
		setFields(_fields);
	};

	const handleChange = (e) => {
		let _fields = fields;
		_fields[e.target.name]['tvalue'] = e.target.value;
		setFields({ ..._fields });
	};

	// Handle inital submit, checking validation
	// before passing up to submit in parent component
	function submitHandler(event) {
		event.preventDefault();
		event.stopPropagation();
		submitForm();
	}

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
					className={fields.agentName.class}
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
					className={fields.agentEmail.class}
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
						className={fields.agentDept.class}
						errorMessage={fields.agentDept.error}
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
