import MembershipFields from '../components/membershipFields';

export default function Membership({
	data,
	updateCallback,
	updateCallbackCancel,
}) {
	const handleCancel = () => {
		console.log('cancelled membership update');
		updateCallbackCancel();
	};

	const handleSubmit = (fields) => {
		const membership = {
			membershipNumber: fields.membershipNumber,
			dateCompleted: fields.dateCompleted,
			memberSwitchFrom: fields.memberSwitchFrom,
		};

		updateCallback(membership);
	};

	return (
		<div className="row">
			<MembershipFields
				data={data}
				handleSubmit={handleSubmit}
				handleCancel={handleCancel}
			/>
		</div>
	);
}
