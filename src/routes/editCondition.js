import ConditionFields from '../components/forms/conditionFields';

export default function EditCondition({
	callbackUpdate,
	callbackCancel,
	condition,
	member,
}) {
	const handleCancel = () => {
		callbackCancel();
	};

	const handleSubmit = (fields) => {
		const updatedCondition = {
			id: condition.id,
			condition: fields.condition,
			hasConsulatedProvider: fields.hasConsulatedProvider,
			consultingProviderDetails: fields.consultingProviderDetails,
			hasTreatmentPlanned: fields.hasTreatmentPlanned,
			treatmentPlannedDetails: fields.treatmentPlannedDetails,
			isTakingMedication: fields.isTakingMedication,
			medications: fields.medications,
			notes: fields.notes,
		};

		callbackUpdate(updatedCondition, member);
	};

	return (
		<ConditionFields
			data={condition}
			handleCancel={handleCancel}
			handleSubmit={handleSubmit}
		/>
	);
}
