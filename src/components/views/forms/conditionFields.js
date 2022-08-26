import { useEffect, useRef } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import RadioGroup from '../../forms/radioGroup';
import TextArea from '../../forms/textArea';
import TextInput from '../../forms/textInput';

function ConditionFields(props) {
	const handleCancel = props.handleCancel;
	const handleSubmit = props.handleSubmit;
	const ref = useRef();

	const initialValues =
		props.data !== undefined && Object.keys(props.data).length > 0
			? props.data
			: {
					condition: '',
					hasConsulatedProvider: '',
					consultingProviderDetails: '',
					hasTreatmentPlanned: '',
					treatmentPlannedDetails: '',
					isTakingMedication: '',
					medications: '',
					notes: '',
			  };

	//give the medical condition field focus only new new entry
	useEffect(() => {
		if (!props.data) {
			ref.current.focus();
		}
	}, [props]);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={Yup.object({
				condition: Yup.string().required('Condition required'),
				hasConsulatedProvider: Yup.string()
					.oneOf(['Yes', 'No'], 'Invalid selection')
					.required('Selection required'),
				consultingProviderDetails: Yup.string().when('hasConsulatedProvider', {
					is: 'Yes',
					then: (schema) => schema.required('required now'),
				}),
				hasTreatmentPlanned: Yup.string()
					.oneOf(['Yes', 'No'], 'Invalid selection')
					.required('Selection required'),
				treatmentPlannedDetails: Yup.string().when('hasTreatmentPlanned', {
					is: 'Yes',
					then: (schema) => schema.required('required now'),
				}),

				isTakingMedication: Yup.string()
					.oneOf(['Yes', 'No'], 'Invalid selection')
					.required('Selection required'),
				medications: Yup.string().when('isTakingMedication', {
					is: 'Yes',
					then: (schema) => schema.required('required now'),
				}),

				notes: Yup.string(),
			})}
			onSubmit={(values, { setSubmitting }) => {
				handleSubmit(values);
			}}
		>
			{(props) => (
				<Form className="pb-2">
					<div className="row">
						<div className="mb-4 mt-4">
							<TextInput
								ref={ref}
								label="Medical condition"
								name="condition"
								type="text"
							/>
						</div>
					</div>
					<div className="mb-4">
						<RadioGroup
							name="hasConsulatedProvider"
							label="Seen a specialist or received treatment in a hospital within last 12
						months?"
							options={['Yes', 'No']}
						/>
					</div>
					{props.values.hasConsulatedProvider === 'Yes' && (
						<div className="mb-4 mt-3">
							<TextArea
								label="Visiting details"
								name="consultingProviderDetails"
							/>
						</div>
					)}
					<div className="mb-4">
						<RadioGroup
							name="hasTreatmentPlanned"
							label="Any treatment, investigations or tests planned or pending?"
							options={['Yes', 'No']}
						/>
					</div>
					{props.values.hasTreatmentPlanned === 'Yes' && (
						<div className="mb-4 mt-3">
							<TextArea
								label="Treatment details"
								name="treatmentPlannedDetails"
							/>
						</div>
					)}
					<div className="mb-4">
						<RadioGroup
							name="isTakingMedication"
							label="Currently taking any medication?"
							options={['Yes', 'No']}
						/>
					</div>
					{props.values.isTakingMedication === 'Yes' && (
						<div className="mb-4 mt-3">
							<TextArea label="Medication details" name="medications" />
						</div>
					)}
					<div className="pb-4">
						<TextArea label="Notes" name="notes" />
					</div>
					<button type="submit" className="btn btn-primary">
						{!props.data ? 'Submit' : 'Update'}
					</button>
					&nbsp;
					<button onClick={() => handleCancel()} className="btn btn-secondary">
						Cancel
					</button>
				</Form>
			)}
		</Formik>
	);
}

export default ConditionFields;
