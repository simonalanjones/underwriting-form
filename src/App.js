import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import RequireData from './common/requireData';

import MemberLayout from './components/views/layouts/memberLayout';
import { clearMembers } from './services/memberData';
import { clearMembership } from './services/membershipData';
//
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
import { getAgent } from './services/agentData';
import { getMembership } from './services/membershipData';
import { memberCount } from './services/memberData';

import { submit } from './services/submit';

const App = () => {
	const [messageState, setMessageState] = useState([]);
	const [selectedMember, setSelectedMember] = useState(null);
	const [progress, setProgress] = useState(1);

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
		if (getAgent) {
			setProgress(33);
		}
		if (getMembership().membershipNumber) {
			setProgress(66);
		}
		if (memberCount() > 0) {
			setProgress(100);
		}
	}

	function callbackSelectedMember(member) {
		console.log('got member', member);
		if (member !== selectedMember) {
			console.log('setting member', member);
			setSelectedMember(member);
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
		submit();
		// this should attempt to send data and act accordingly below
		addMessage('Your form has been submitted - no data was sent in the demo');
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
						element={
							<MemberView
								callbackSetSelected={callbackSelectedMember}
								postback={updateProgress}
							/>
						}
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
