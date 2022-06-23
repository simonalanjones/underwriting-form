import React, { useState, useEffect, useRef } from 'react';
import SelectOptions from '../common/selectOptions';

function MemberFields(props) {
	const formRef = useRef();
	const firstnameInput = useRef();

	const handleCancel = props.handleCancel;
	const handleSubmit = props.handleSubmit;

	const [fields, setFields] = useState({
		userFirstName: '',
		userLastName: '',
		relation: '',
		title: '',
		phoneNumber: '',
		dateOfBirth: '',
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
				relation: props.data.relation,
				title: props.data.title,
				phoneNumber: props.data.phoneNumber,
				dateOfBirth: props.data.dateOfBirth,
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
		<form
			onSubmit={submitHandler}
			ref={formRef}
			className="needs-validation p-4 p-md-5 border rounded-3 bg-white shadow-sm"
			noValidate
		>
			<div className={'container'}>
				<div className="mb-4">
					<div className="row mb-4">
						<div className="col">
							<label htmlFor="userFirstName" className="form-label">
								First name
							</label>

							<input
								ref={firstnameInput}
								type="input"
								name="userFirstName"
								maxLength="25"
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
								Last name
							</label>

							<input
								type="input"
								name="userLastName"
								maxLength="25"
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
						<div className="row mb-4">
							<div className="col">
								<label htmlFor="relation" className="form-label">
									Relation
								</label>

								<SelectOptions
									name="relation"
									id="relation"
									changeHandler={handleChange}
									selected={fields.relation}
									options={[
										'Main subscriber',
										'Male dependant',
										'Female dependant',
										'Male child',
										'Female child',
										'Other',
									]}
									required={true}
								/>
								<div className="invalid-feedback">
									Please select member relation
								</div>
							</div>
							<div className="col">
								<label htmlFor="title" className="form-label">
									Title
								</label>

								<SelectOptions
									name="title"
									id="title"
									changeHandler={handleChange}
									selected={fields.title}
									options={['Mr', 'Mrs', 'Miss', 'Master', 'Other']}
									required={true}
								/>
								<div className="invalid-feedback">
									Please select member title
								</div>
							</div>
						</div>
					</div>

					<div className="mb-4">
						<label htmlFor="phoneNumber" className="form-label">
							Telephone No.
						</label>

						<input
							type="input"
							name="phoneNumber"
							className="form-control"
							maxLength="25"
							id="phoneNumber"
							value={fields.phoneNumber}
							onChange={handleChange}
						/>
					</div>

					<div className="mb-5">
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
				</div>
				<button type="submit" className="btn btn-primary">
					{!props.data ? 'Submit' : 'Update'}
				</button>
				&nbsp;
				<button onClick={handleCancel} className="btn btn-secondary">
					Cancel
				</button>
			</div>
		</form>
	);
}

export default MemberFields;
