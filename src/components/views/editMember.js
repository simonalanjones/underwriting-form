import MemberFields from './forms/memberFields';

export default function EditMember({ member, callbackUpdate, callbackCancel }) {
	const handleSubmit = (fields) => {
		const updatedMemberData = {
			id: member.id,
			userFirstName: fields.userFirstName,
			userLastName: fields.userLastName,
			title: fields.title,
			relation: fields.relation,
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
		<>
			{/* <h6 className="pb-1">Edit member</h6> */}
			<MemberFields
				data={member}
				handleSubmit={handleSubmit}
				handleCancel={handleCancel}
			/>
		</>
	);
}
