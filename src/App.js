import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import RequireData from './common/requireData';
import MemberLayout from './components/views/layouts/memberLayout';
import { clearMembers } from './services/memberData';
import { clearMembership } from './services/membershipData';
import Layout from './components/views/layouts/layout';
import Progress from './components/progress';
import Agent from './components/route/agent';
import Membership from './components/route/membership';
import Index from './components/route/index';
import MemberView from './components/route/memberView';
import MemberIndex from './components/route/memberIndex';
import MemberEdit from './components/route/memberEdit';
import MemberAdd from './components/route/memberAdd';
import ConditionAdd from './components/route/conditionAdd';
import ConditionEdit from './components/route/conditionEdit';
import { hasAgent } from './services/agentData';
import { getMembership } from './services/membershipData';
import { memberCount } from './services/memberData';
import { submit } from './services/submit';

const App = () => {
	const [messageState, setMessageState] = useState([]);
	//const [selectedMember, setSelectedMember] = useState(null);
	const [progress, setProgress] = useState(1);

	useEffect(() => {
		updateProgress();
		//console.log(progress);
	});

	function addMessage(messageText) {
		const message = {
			id: new Date().getTime().toString(36) + new Date().getUTCMilliseconds(),
			body: messageText,
			shown: false,
		};

		const messages = [...messageState, message];
		setMessageState(messages);
	}

	function updateProgress() {
		// ******************************************
		///// allow submit button if progress === 100

		if (hasAgent()) {
			setProgress(33);
		}
		if (getMembership().membershipNumber) {
			setProgress(66);
		}
		if (memberCount() > 0) {
			setProgress(100);
		}
	}

	function callbackMessageDelete(messageId) {
		const messages = messageState.filter(
			(_message) => _message.id !== messageId
		);
		setMessageState(messages);
	}

	function callbackClearForm() {
		clearMembers();
		clearMembership();
		updateProgress();
		addMessage('The form has been reset');
	}

	function callbackSubmitForm() {
		// submit and wait for response sent to postCallbackForm
		submit(postCallbackSubmitForm);
	}

	function postCallbackSubmitForm(status) {
		//console.log('you got back!', status);
		if (status === 404) {
			addMessage('Your form failed to send. Please contact support');
		} else if (status === 200) {
			addMessage('Your form has been submitted - no data was sent in the demo');
		}
	}

	return (
		<>
			<Progress amount={progress} />
			<Routes>
				<Route
					element={
						<Layout
							progress={progress}
							messageState={messageState}
							callbackMessageDelete={callbackMessageDelete}
						/>
					}
				>
					<Route path="/" element={<Index />} />
					<Route path="agent" element={<Agent postback={updateProgress} />} />
					<Route
						path="membership"
						element={<Membership postback={updateProgress} />}
					/>
				</Route>

				<Route
					path="members"
					element={
						<RequireData>
							<MemberLayout
								progress={progress}
								callbackSubmitForm={callbackSubmitForm}
								callbackClearForm={callbackClearForm}
								messageState={messageState}
								callbackMessageDelete={callbackMessageDelete}
							/>
						</RequireData>
					}
				>
					<Route index element={<MemberIndex postback={updateProgress} />} />
					<Route path="add" element={<MemberAdd postback={updateProgress} />} />
					<Route path="edit/:member" element={<MemberEdit />} />
					<Route
						path="view/:member"
						element={<MemberView postback={updateProgress} />}
					/>
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
