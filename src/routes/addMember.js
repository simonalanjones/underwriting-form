import MemberFields from '../components/memberFields';

export default function AddMember({ callbackUpdate, callbackCancel }) {
	//
	const handleSubmit = (fields) => {
		let uniqueId =
			new Date().getTime().toString(36) + new Date().getUTCMilliseconds();

		const member = {
			id: uniqueId,
			userFirstName: fields.userFirstName,
			userLastName: fields.userLastName,
			phoneNumber: fields.phoneNumber,
			dateOfBirth: fields.dateOfBirth,
			conditions: [],
		};

		callbackUpdate(member);
	};

	const handleCancel = () => {
		callbackCancel();
	};

	return (
		<>
			<h6 className="pb-1">Add member</h6>
			<MemberFields handleCancel={handleCancel} handleSubmit={handleSubmit} />
		</>
	);
}
