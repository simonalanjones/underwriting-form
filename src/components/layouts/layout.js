import { Outlet } from 'react-router-dom';
import Navigation from '../navigation';
import Messages from '../messages';

export default function Layout({
	agentState,
	messageState,
	callbackMessageDelete,
}) {
	return (
		<>
			<Navigation agent={agentState} />

			<Messages
				messageState={messageState}
				callbackMessageDelete={callbackMessageDelete}
			/>
			<div className="container mt-5">
				<Outlet />
			</div>
		</>
	);
}
