import AgentFields from '../components/forms/agentFields';

export default function Agent({ agent, updateCallback, updateCallbackCancel }) {
	const handleCancel = () => {
		console.log('cancelled agent update');
		updateCallbackCancel();
	};

	const handleSubmit = (fields) => {
		const agent = {
			name: fields.agentName,
			email: fields.agentEmail,
			dept: fields.agentDept,
		};

		// pass the data back to the app
		updateCallback(agent);
	};
	return (
		<AgentFields
			data={agent}
			handleSubmit={handleSubmit}
			handleCancel={handleCancel}
		/>
	);
}
