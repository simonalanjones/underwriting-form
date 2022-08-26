import { useEffect, useRef } from 'react';
import { Formik, Form } from 'formik';
import RadioGroup from '../../forms/radioGroup';
import TextInput from '../../forms/textInput';
import * as Yup from 'yup';

const AgentFields = (props) => {
	const deptOptions = ['Retention', 'Acquisition'];
	const initialValues =
		props.data !== undefined && Object.keys(props.data).length > 0
			? props.data
			: {
					agentName: '',
					agentEmail: '',
					agentDept: '',
			  };
	const handleSubmitFunction = props.handleSubmit;
	const handleCancelFunction = props.handleCancel;
	const ref = useRef();

	useEffect(() => {
		if (props.data !== undefined && props.data.length === 0) {
			ref.current.focus();
		}
	}, [props]);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={Yup.object({
				agentName: Yup.string()
					.max(15, 'Must be 15 characters or less')
					.required('Agent Name required'),
				agentEmail: Yup.string()
					.email('Invalid email address')
					.required('Agent Email required'),
				agentDept: Yup.string()
					.oneOf(deptOptions, 'Invalid dept')
					.required('Agent Dept required'),
			})}
			onSubmit={(values, { setSubmitting }) => {
				handleSubmitFunction(values);
			}}
		>
			<Form className="pb-2">
				<div className="row">
					<div className="mb-4 mt-4">
						<TextInput
							ref={ref}
							label="Agent name"
							name="agentName"
							type="text"
						/>
					</div>
				</div>
				<div className="mb-4">
					<TextInput label="Agent email" name="agentEmail" type="email" />
				</div>
				<div className="mb-5">
					<RadioGroup
						name="agentDept"
						label="Agent dept"
						options={deptOptions}
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
};

export default AgentFields;
