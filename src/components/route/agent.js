import AgentFields from '../views/forms/agentFields';
import { hasMembership } from '../../services/membershipData';
import { setAgent, getAgent } from '../../services/agentData';
import { useNavigate } from 'react-router-dom';

export default function Agent({ postback }) {
	const navigate = useNavigate();
	const agent = getAgent();

	const handleCancel = () => {
		if (hasMembership()) {
			navigate('/');
		} else {
			navigate('/membership');
		}
	};

	const handleSubmit = (fields) => {
		setAgent(fields);
		postback();
		if (hasMembership()) {
			navigate('/');
		} else {
			navigate('/membership');
		}
	};
	return (
		<AgentFields
			data={agent}
			handleSubmit={handleSubmit}
			handleCancel={handleCancel}
		/>
	);
}
