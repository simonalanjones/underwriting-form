import MemberFields from './forms/memberFields';
import UIContainer from '../../common/uiContainer';

export default function AddMember({
	callbackUpdate,
	callbackCancel,
	hasSubscriber,
	postback,
}) {
	const handleSubmit = (fields) => {
		let uniqueId =
			new Date().getTime().toString(36) + new Date().getUTCMilliseconds();

		const member = {
			id: uniqueId,
			userFirstName: fields.userFirstName,
			userLastName: fields.userLastName,
			title: fields.title,
			relation: fields.relation,
			phoneNumber: fields.phoneNumber,
			dateOfBirth: fields.dateOfBirth,
			conditions: [],
		};

		callbackUpdate(member);
		postback();
	};

	const handleCancel = () => {
		callbackCancel();
	};

	return (
		<UIContainer title="Add member">
			<MemberFields
				handleCancel={handleCancel}
				handleSubmit={handleSubmit}
				hasSubscriber={hasSubscriber}
			/>
		</UIContainer>
	);
}
