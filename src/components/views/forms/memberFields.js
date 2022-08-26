import { useState, useEffect, useRef } from 'react';
import { Formik, Form, useFormikContext } from 'formik';
import * as Yup from 'yup';
import DependantCheck from '../dependantCheck';
import SubscriberCheck from '../subscriberCheck';
import TextInput from '../../forms/textInput';
import SelectOptions from '../../forms/selectOptions';

function MemberFields(props) {
	const [formRelation, setFormRelation] = useState('');
	const [disclaimerChecked, setDisclaimerChecked] = useState(false);

	const ref = useRef();
	// used to track whether we are inputting a subscriber or dependant
	// the disclosure box will appear based on this value
	// as Formik change handler is already taken, we will observe the value changes
	const FormObserver = () => {
		const { values } = useFormikContext();
		useEffect(() => {
			// used to track changes in the relation field
			if (formRelation !== values.relation) {
				if (values.relation === '') {
					setFormRelation('');
				} else {
					setFormRelation(
						values.relation === 'Main subscriber' ? 'subscriber' : 'dependant'
					);
				}
			}
		}, [values]);
		return null;
	};

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

	let titleOptions = ['Mr', 'Mrs', 'Miss', 'Master', 'Other'];

	const initialValues =
		props.data !== undefined && Object.keys(props.data).length > 0
			? props.data
			: {
					userFirstName: '',
					userLastName: '',
					relation: '',
					title: '',
					phoneNumber: '',
					dateOfBirth: '',
			  };

	useEffect(() => {
		if (initialValues.userFirstName !== '') {
			enableSubmit(true);
		}
	}, [initialValues.userFirstName]);

	const handleCancel = props.handleCancel;
	const handleSubmit = props.handleSubmit;

	function enableSubmit(state) {
		setDisclaimerChecked(state);
	}

	useEffect(() => {
		if (!props.data) {
			ref.current.focus();
		}
	}, [props]);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={Yup.object({
				userFirstName: Yup.string().required('First name required'),
				userLastName: Yup.string().required('Last name required'),
				relation: Yup.string()
					.oneOf(relationOptions, 'Invalid relation')
					.required('Relation required'),
				title: Yup.string()
					.oneOf(titleOptions, 'Invalid title')
					.required('Title required'),
				phoneNumber: Yup.string(),
				dateOfBirth: Yup.date().required('Date of birth required'),
			})}
			onSubmit={(values, { setSubmitting }) => {
				handleSubmit(values);
			}}
		>
			<Form className="pb-2">
				<FormObserver />
				<div className="row">
					<div className="col-lg-6 col-md-6 col-sm-12 mt-4">
						<TextInput
							ref={ref}
							label="First name"
							name="userFirstName"
							type="text"
						/>
					</div>
					<div className="col-lg-6 col-md-6 col-sm-12 mt-4">
						<TextInput label="Last name" name="userLastName" type="text" />
					</div>
				</div>
				<div className="row">
					<div className="col-lg-6 col-md-6 col-sm-12 mt-4">
						<SelectOptions
							name="relation"
							label="Relation"
							id="relation"
							options={relationOptions}
						/>
					</div>
					<div className="col-lg-6 col-md-6 col-sm-12 mt-4">
						<SelectOptions
							name="title"
							label="Title"
							id="title"
							options={titleOptions}
						/>
					</div>
				</div>
				<div className="row mb-4">
					<div className="col-lg-6 col-md-6 col-sm-12 mt-4">
						<TextInput label="Date of Birth" name="dateOfBirth" type="date" />
					</div>
					<div className="col-lg-6 col-md-6 col-sm-12 mt-4">
						<TextInput label="Telephone No." name="phoneNumber" type="text" />
					</div>
				</div>
				{formRelation === 'subscriber' && (
					<SubscriberCheck
						callback={enableSubmit}
						checked={disclaimerChecked}
					/>
				)}
				{formRelation === 'dependant' && (
					<DependantCheck callback={enableSubmit} checked={disclaimerChecked} />
				)}
				<button
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
			</Form>
		</Formik>
	);
}

export default MemberFields;
