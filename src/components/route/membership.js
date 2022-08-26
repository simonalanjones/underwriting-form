import MembershipFields from '../views/forms/membershipFields';
import { setMembership, getMembership } from '../../services/membershipData';
import { useNavigate } from 'react-router-dom';
import UIContainer from '../../common/uiContainer';

export default function Membership({ postback }) {
	const navigate = useNavigate();

	const handleCancel = () => {
		navigate('/');
	};

	const handleSubmit = (fields) => {
		const membership = {
			membershipNumber: fields.membershipNumber,
			dateCompleted: fields.dateCompleted,
			memberSwitchFrom: fields.memberSwitchFrom,
		};

		setMembership(membership);
		postback();
		navigate('/');
	};

	return (
		<UIContainer title="Membership" type="slim">
			<MembershipFields
				data={getMembership()}
				handleSubmit={handleSubmit}
				handleCancel={handleCancel}
			/>
		</UIContainer>
	);
}
