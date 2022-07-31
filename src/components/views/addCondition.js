import ConditionFields from './forms/conditionFields';

export default function AddCondition({
	member,
	callbackUpdate,
	callbackCancel,
}) {
	const handleCancel = () => {
		callbackCancel();
	};

	const handleSubmit = (fields) => {
		const uniqueId =
			new Date().getTime().toString(36) + new Date().getUTCMilliseconds();

		const condition = {
			id: uniqueId,
			condition: fields.condition,
			hasConsulatedProvider: fields.hasConsulatedProvider,
			consultingProviderDetails: fields.consultingProviderDetails,
			hasTreatmentPlanned: fields.hasTreatmentPlanned,
			treatmentPlannedDetails: fields.treatmentPlannedDetails,
			isTakingMedication: fields.isTakingMedication,
			medications: fields.medications,
			notes: fields.notes,
		};

		callbackUpdate(member, condition);
	};

	return (
		<>
			{/* <h6 className="pb-1">Add condition</h6> */}
			<ConditionFields
				handleCancel={handleCancel}
				handleSubmit={handleSubmit}
			/>
		</>
	);
}
