import React, { useState, useEffect, useRef } from 'react';
import RadioOptions from './common/radioOptions';

function MemberFields(props) {
	const formRef = useRef();
	const firstnameInput = useRef();

	const handleCancel = props.handleCancel;
	const handleSubmit = props.handleSubmit;

	const [fields, setFields] = useState({
		userFirstName: '',
		userLastName: '',
		membershipNumber: '',
		phoneNumber: '',
		dateOfBirth: '',
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
			firstnameInput.current.focus();
		}
	}, [props]);

	// handle incoming prop data, one-time use
	useEffect(() => {
		if (props.data) {
			setFields({
				userFirstName: props.data.userFirstName,
				userLastName: props.data.userLastName,
				membershipNumber: props.data.membershipNumber,
				phoneNumber: props.data.phoneNumber,
				dateOfBirth: props.data.dateOfBirth,
				dateCompleted: props.data.dateCompleted,
				memberSwitchFrom: props.data.memberSwitchFrom,
			});
		}
	}, [props.data]);

	const handleChange = (e) => {
		setFields({
			...fields,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<>
			<form
				onSubmit={submitHandler}
				ref={formRef}
				className="needs-validation"
				noValidate
			>
				<div className={'container'}>
					<div className="mb-4">
						<div className="row mb-4">
							<div className="col">
								<label htmlFor="userFirstName" className="form-label">
									Member first name
								</label>

								<input
									ref={firstnameInput}
									type="input"
									name="userFirstName"
									className="form-control"
									id="firstName"
									value={fields.userFirstName}
									onChange={handleChange}
									required
								/>
								<div className="invalid-feedback">
									Please enter member firstname
								</div>
							</div>
							<div className="col">
								<label htmlFor="userLastName" className="form-label">
									Member last name
								</label>

								<input
									type="input"
									name="userLastName"
									className="form-control"
									id="userLastName"
									value={fields.userLastName}
									onChange={handleChange}
									required
								/>

								<div className="invalid-feedback">
									Please enter member lastname.
								</div>
							</div>
						</div>

						<div className="mb-4">
							<label htmlFor="membershipNumber" className="form-label">
								Existing Membership No.
							</label>

							<input
								type="input"
								name="membershipNumber"
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
							<label htmlFor="agentEmail" className="form-label">
								Telephone No.
							</label>

							<input
								type="input"
								name="phoneNumber"
								className="form-control"
								id="phoneNumber"
								value={fields.phoneNumber}
								onChange={handleChange}
							/>
						</div>

						<div className="mb-4">
							<label htmlFor="dateOfBirth" className="form-label">
								Date of Birth
							</label>

							<input
								type="date"
								name="dateOfBirth"
								className="form-control"
								id="dateOfBirth"
								value={fields.dateOfBirth}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="mb-4">
							<label htmlFor="dateCompleted" className="form-label">
								Date Completed
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
						Submit
					</button>
					&nbsp;
					<button
						type="submit"
						onClick={handleCancel}
						className="btn btn-secondary"
					>
						Cancel
					</button>
				</div>
			</form>
		</>
	);
}

export default MemberFields;
