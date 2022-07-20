import React, { useState, useEffect, useRef } from 'react';
import SelectOptions from '../../common/selectOptions';
import DependantCheck from '../dependantCheck';
import SubscriberCheck from '../subscriberCheck';

function MemberFields(props) {
	const formRef = useRef();
	const submitRef = useRef();
	const firstnameInput = useRef();

	let relationOptions = [
		'Main subscriber',
		'Male dependant',
		'Female dependant',
		'Male child',
		'Female child',
		'Other',
	];

	// if flag received to exclude main subscriber from relation options
	// update the relation array to remove it
	if (props.hasSubscriber) {
		relationOptions = relationOptions.filter(
			(element) => element !== 'Main subscriber'
		);
	}

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

	const [formRelation, setFormRelation] = useState('');
	const [disclaimerChecked, setDisclaimerChecked] = useState(false);

	function enableSubmit(state) {
		setDisclaimerChecked(state);
	}

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
			console.log(props.data.relation);
			setFields({
				userFirstName: props.data.userFirstName,
				userLastName: props.data.userLastName,
				relation: props.data.relation,
				title: props.data.title,
				phoneNumber: props.data.phoneNumber,
				dateOfBirth: props.data.dateOfBirth,
			});

			// repop the selected relation in state
			// if (props.data.relation === 'Main subscriber') {
			// 	setFormRelation('subscriber');
			// } else {
			// 	setFormRelation('dependant');
			// }
			setDisclaimerChecked(true);
		}
	}, [props.data]);

	useEffect(() => {
		if (formRelation !== '') {
			setDisclaimerChecked(false);
		}
	}, [formRelation]);

	const handleChange = (e) => {
		setFields({
			...fields,
			[e.target.name]: e.target.value,
		});

		// if we change the relation dropdown,
		// update the state so the relevant disclaimer
		// checks are shown before submit is enabled
		if (e.target.name === 'relation') {
			const input = e.target.value;
			if (input === '') {
				setFormRelation('');
			} else if (input === 'Main subscriber') {
				setFormRelation('subscriber');
			} else {
				setFormRelation('dependant');
			}
		}
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
									options={relationOptions}
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

					<div className="row mb-4">
						<div className="col">
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

						<div className="col">
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
					</div>
				</div>
				{formRelation === 'subscriber' && (
					<SubscriberCheck callback={enableSubmit} />
				)}
				{formRelation === 'dependant' && (
					<DependantCheck callback={enableSubmit} />
				)}
				<button
					ref={submitRef}
					type="submit"
					className="btn btn-primary"
					disabled={!disclaimerChecked}
				>
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
