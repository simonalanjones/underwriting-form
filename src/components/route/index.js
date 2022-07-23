import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { hasAgent } from '../../services/agentData';
import { hasMembership } from '../../services/membershipData';

export default function Index() {
	const navigate = useNavigate();

	useEffect(() => {
		if (!hasAgent()) {
			navigate('/agent');
		} else if (!hasMembership()) {
			navigate('/membership');
		} else {
			navigate('/members');
		}
	}, [navigate]);
}
