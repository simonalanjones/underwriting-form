import AgentFields from '../forms/agentFields';
import { hasMembership } from '../../services/membershipData';
import { setAgent, getAgent } from '../../services/agentData';
import { useNavigate } from 'react-router-dom';

export default function Agent() {
	const navigate = useNavigate();
	const agent = getAgent();

	const handleCancel = () => {
		console.log('cancelled agent update');
		if (hasMembership()) {
			navigate('/');
		} else {
			navigate('membership');
		}
	};

	const handleSubmit = (fields) => {
		const agent = {
			name: fields.agentName,
			email: fields.agentEmail,
			dept: fields.agentDept,
		};

		setAgent(agent);
		if (hasMembership()) {
			navigate('/');
		} else {
			navigate('membership');
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
