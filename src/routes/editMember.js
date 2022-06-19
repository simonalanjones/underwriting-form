import MemberFields from '../components/memberFields';

export default function EditMember({ member, callbackUpdate, callbackCancel }) {
	const handleSubmit = (fields) => {
		const updatedMemberData = {
			id: member.id,
			userFirstName: fields.userFirstName,
			userLastName: fields.userLastName,
			membershipNumber: fields.membershipNumber,
			phoneNumber: fields.phoneNumber,
			dateOfBirth: fields.dateOfBirth,
			dateCompleted: fields.dateCompleted,
			memberSwitchFrom: fields.memberSwitchFrom,
			conditions: member.conditions,
		};

		callbackUpdate(updatedMemberData);
	};

	const handleCancel = () => {
		callbackCancel();
	};

	return (
		<MemberFields
			data={member}
			handleSubmit={handleSubmit}
			handleCancel={handleCancel}
		/>
	);
}
