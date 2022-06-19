import React, { useState, useEffect, useRef } from 'react';
import RadioOptions from '../components/common/radioOptions';

function MembershipFields(props) {
	const formRef = useRef();
	const membershipInput = useRef();

	const handleCancel = props.handleCancel;
	const handleSubmit = props.handleSubmit;

	const [fields, setFields] = useState({
		membershipNumber: '',
		dateCompleted: '',
		memberSwitchFrom: '',
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

	useEffect(() => {
		if (!props.data) {
			membershipInput.current.focus();
		}
	}, [props]);

	// handle incoming prop data, one-time use
	useEffect(() => {
		if (props.data) {
			setFields({
				membershipNumber:
					props.data.membershipNumber !== undefined
						? props.data.membershipNumber
						: '',
				dateCompleted:
					props.data.dateCompleted !== undefined
						? props.data.dateCompleted
						: '',
				memberSwitchFrom:
					props.data.memberSwitchFrom !== undefined
						? props.data.memberSwitchFrom
						: '',
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
		<>
			<form
				onSubmit={submitHandler}
				ref={formRef}
				className="needs-validation p-4 p-md-5 border rounded-3 bg-white mx-auto shadow-sm"
				noValidate
				style={style}
			>
				<div className="mb-4">
					<div className="mb-4">
						<label htmlFor="membershipNumber" className="form-label">
							Existing Membership No.
						</label>

						<input
							type="input"
							name="membershipNumber"
							ref={membershipInput}
							className="form-control"
							id="membershipNumber"
							value={fields.membershipNumber}
							onChange={handleChange}
							required
						/>
						<div className="invalid-feedback">
							Please enter membership number
						</div>
					</div>

					<div className="mb-4">
						<label htmlFor="dateCompleted" className="form-label">
							Date completed
						</label>

						<input
							type="date"
							name="dateCompleted"
							className="form-control"
							id="dateCompleted"
							value={fields.dateCompleted}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="mb-5">
						<p className="form-label">Member switching from</p>

						<div className="form-group">
							<RadioOptions
								name="memberSwitchFrom"
								changeHandler={handleChange}
								value={fields.memberSwitchFrom}
								options={['CREST', 'HARPA', 'Competitor Switch']}
								checkedItem={fields.memberSwitchFrom}
								required={true}
							/>
						</div>
					</div>
				</div>
				<button type="submit" className="btn btn-primary">
					{Object.keys(props.data).length === 0 ? 'Submit' : 'Update'}
				</button>
				&nbsp;
				{Object.keys(props.data).length > 0 && (
					<button
						type="submit"
						onClick={handleCancel}
						className="btn btn-secondary"
					>
						Cancel
					</button>
				)}
			</form>
		</>
	);
}

export default MembershipFields;
