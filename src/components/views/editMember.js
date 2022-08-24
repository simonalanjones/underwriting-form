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
	const headingStyle = {
		textTransform: 'uppercase',
		fontSize: '0.85em',
		letterSpacing: '1px',
	};
	return (
		<>
			<div className="shadow-sm bg-white pt-3 px-5 bg-white">
				<h6 className="mt-2" style={headingStyle}>
					Edit member
				</h6>
				<MemberFields
					data={member}
					handleSubmit={handleSubmit}
					handleCancel={handleCancel}
				/>
			</div>
		</>
	);
}
