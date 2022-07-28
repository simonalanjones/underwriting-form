import MembershipFields from '../views/forms/membershipFields';
import { setMembership, getMembership } from '../../services/membershipData';
import { useNavigate } from 'react-router-dom';

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
		<div className="row">
			<MembershipFields
				data={getMembership()}
				handleSubmit={handleSubmit}
				handleCancel={handleCancel}
			/>
		</div>
	);
}
