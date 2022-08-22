import React from 'react';
import { Formik, Form } from 'formik';
import RadioGroup from '../../forms/radioGroup';
import TextInput from '../../forms/textInput';
import * as Yup from 'yup';

function MembershipFields(props) {
	const switchFromOptions = ['CREST', 'HARPA', 'Competitor Switch'];

	const dateToday = () => {
		var date = new Date();
		var today = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
			.toISOString()
			.split('T')[0];
		return today;
	};

	const handleSubmitFunction = props.handleSubmit;
	const handleCancelFunction = props.handleCancel;

	const initialValues =
		props.data !== undefined && Object.keys(props.data).length > 0
			? props.data
			: {
					membershipNumber: '',
					dateCompleted: dateToday(),
					memberSwitchFrom: '',
			  };

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={Yup.object({
				membershipNumber: Yup.string().required('Membership Number required'),
				dateCompleted: Yup.string().required('Completed Date required'),
				memberSwitchFrom: Yup.string()
					.oneOf(switchFromOptions, 'Invalid switch')
					.required('Switch from required'),
			})}
			onSubmit={(values, { setSubmitting }) => {
				handleSubmitFunction(values);
			}}
		>
			<Form
				style={{
					width: '100%',
					maxWidth: 500,
				}}
				className="p-4 p-md-5 border rounded-3 bg-white mx-auto shadow-sm"
			>
				<div className="mb-4">
					<TextInput
						label="Existing Membership No."
						name="membershipNumber"
						type="text"
					/>
				</div>
				<div className="mb-4">
					<TextInput label="Date completed" name="dateCompleted" type="date" />
				</div>
				<div className="mb-5">
					<RadioGroup
						name="memberSwitchFrom"
						label="Member switching from"
						options={switchFromOptions}
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
				&nbsp;
				<button
					type="submit"
					onClick={handleCancelFunction}
					className="btn btn-secondary"
				>
					Cancel
				</button>
			</Form>
		</Formik>
	);
}

export default MembershipFields;
