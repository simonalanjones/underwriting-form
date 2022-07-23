import { useNavigate } from 'react-router-dom';
import { hasAgent } from '../services/agentData';
import { hasMembership } from '../services/membershipData';

export default function RequireData({ children }) {
	const navigate = useNavigate();

	if (!hasAgent()) {
		navigate('/agent');
	} else if (!hasMembership()) {
		navigate('/membership');
	} else {
		return children;
	}
}
