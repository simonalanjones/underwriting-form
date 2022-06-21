import MemberFields from '../components/forms/memberFields';

export default function EditMember({ member, callbackUpdate, callbackCancel }) {
	const handleSubmit = (fields) => {
		const updatedMemberData = {
			id: member.id,
			userFirstName: fields.userFirstName,
			userLastName: fields.userLastName,
			phoneNumber: fields.phoneNumber,
			dateOfBirth: fields.dateOfBirth,
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
