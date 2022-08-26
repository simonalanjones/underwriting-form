import MemberFields from './forms/memberFields';
import UIContainer from '../../common/uiContainer';

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
		<UIContainer title="Edit member">
			<MemberFields
				data={member}
				handleSubmit={handleSubmit}
				handleCancel={handleCancel}
			/>
		</UIContainer>
	);
}
