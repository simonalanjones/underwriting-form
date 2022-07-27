import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import RequireData from './common/requireData';
import Layout from './components/views/layouts/layout';
import MemberLayout from './components/views/layouts/memberLayout';

//
import Agent from './components/route/agent';
import Membership from './components/route/membership';
import Index from './components/route/index';
import MemberView from './components/route/memberView';
import MemberIndex from './components/route/memberIndex';
import MemberEdit from './components/route/memberEdit';
import MemberAdd from './components/route/memberAdd';
import ConditionAdd from './components/route/conditionAdd';
import ConditionEdit from './components/route/conditionEdit';

import { submit } from './services/submit';

const App = () => {
	const [messageState, setMessageState] = useState([]);

	function addMessage(messageText) {
		const message = {
			id: new Date().getTime().toString(36) + new Date().getUTCMilliseconds(),
			body: messageText,
			shown: false,
		};

		const messages = [...messageState, message];
		setMessageState(messages);
		//console.log('updated messages:', messageState);
	}

	function callbackMessageDelete(messageId) {
		const messages = messageState.filter(
			(_message) => _message.id !== messageId
		);
		setMessageState(messages);
	}

	function callbackClearForm() {
		//setMembershipState([]);
		//setMembershipData([]);
		addMessage('The form has been reset');
	}

	function callbackSubmitForm() {
		submit();
		// this should attempt to send data and act accordingly below
		addMessage('Your form has been submitted - no data was sent in the demo');
	}

	return (
		<>
			<Routes>
				<Route
					element={
						<Layout
							messageState={messageState}
							callbackMessageDelete={callbackMessageDelete}
						/>
					}
				>
					<Route path="/" element={<Index />} />
					<Route path="agent" element={<Agent />} />
					<Route path="membership" element={<Membership />} />
				</Route>

				<Route
					path="members"
					element={
						<RequireData>
							<MemberLayout
								callbackSubmitForm={callbackSubmitForm}
								callbackClearForm={callbackClearForm}
								messageState={messageState}
								callbackMessageDelete={callbackMessageDelete}
							/>
						</RequireData>
					}
				>
					<Route index element={<MemberIndex />} />
					<Route path="add" element={<MemberAdd />} />
					<Route path="edit/:member" element={<MemberEdit />} />
					<Route path="view/:member" element={<MemberView />} />
					<Route path="add-condition/:member" element={<ConditionAdd />} />
					<Route
						path="edit-condition/:condition/:member"
						element={<ConditionEdit />}
					/>
				</Route>
			</Routes>
		</>
	);
};

export default App;
