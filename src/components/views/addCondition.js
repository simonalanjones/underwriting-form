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

	const headingStyle = {
		textTransform: 'uppercase',
		fontSize: '0.85em',
		letterSpacing: '1px',
	};

	return (
		<>
			<div className="container shadow-sm bg-white pt-3 pb-3 px-5 bg-white">
				<h6 className="pb-4 mt-2" style={headingStyle}>
					Add condition
				</h6>
				<ConditionFields
					handleCancel={handleCancel}
					handleSubmit={handleSubmit}
				/>
			</div>
		</>
	);
}
