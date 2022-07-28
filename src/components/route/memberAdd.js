import AddMember from '../views/addMember';

import { getMembers, addMember } from '../../services/memberData';
import { useNavigate } from 'react-router-dom';

export default function MemberAdd({ postback }) {
	const hasSubscriber = getMembers().some(
		(element) => element.relation === 'Main subscriber'
	); // **
	const navigate = useNavigate();

	function updateMembers(data) {
		addMember(data);
		const lastMemberId = data.id;
		navigate(`/members/view/${lastMemberId}`);
	}

	return (
		<AddMember
			callbackUpdate={updateMembers}
			callbackCancel={() => navigate('/')}
			hasSubscriber={hasSubscriber}
			postback={postback}
			// pass in relation array based on above check **
		/>
	);
}
