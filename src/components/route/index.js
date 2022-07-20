import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { hasAgent } from '../../services/agentData';
import { hasMembership } from '../../services/membershipData';

export default function Index() {
	const navigate = useNavigate();
	//
	useEffect(() => {
		if (!hasAgent()) {
			navigate('/agent');
		} else if (!hasMembership()) {
			navigate('/membership');
		} else {
			// const selectedMemberId = getSelectedMemberId();
			// if (selectedMemberId !== undefined) {
			//     navigate(`/members/view/${selectedMemberId}`);
			// } else {
			navigate('/members');
			// }
		}
	}, [navigate]);
}
