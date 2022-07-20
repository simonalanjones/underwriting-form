import { Routes, Route, useNavigate } from 'react-router-dom';

import { useState } from 'react';

import { getMembers, getMember } from './services/memberData.js';
import useLocalStorage from './useLocalStorage';

import RequireData from './components/requireData.js';
import Layout from './components/views/layouts/layout';
import MemberLayout from './components/views/layouts/memberLayout';
import Agent from './components/route/agent';
import Membership from './components/route/membership';
import Index from './components/route/index';
import MemberView from './components/route/memberView';
import MemberIndex from './components/route/memberIndex';
import MemberEdit from './components/route/memberEdit';
import MemberAdd from './components/route/memberAdd';
import ConditionAdd from './components/route/conditionAdd';
import ConditionEdit from './components/route/conditionEdit';

const App = () => {
	const navigate = useNavigate();

	// const [agentData, setAgentData] = useLocalStorage('agentData', []);
	// const [agentState, setAgentState] = useState(agentData);
	const [membershipData, setMembershipData] = useLocalStorage(
		'membershipData',
		[]
	);
	const [selectedMember, setSelectedMember] = useState();
	const [membershipState, setMembershipState] = useState(membershipData);
	//
	const [memberData, setMemberData] = getMembers();
	const [memberDataState, setMemberDataState] = useState(memberData);
	//
	const [messageState, setMessageState] = useState([]);

	// service / queue for messages (local storage?)
	function addMessage(messageText) {
		const message = {
			id: new Date().getTime().toString(36) + new Date().getUTCMilliseconds(),
			body: messageText,
			shown: false,
		};

		const messages = [...messageState, message];
		setMessageState(messages);
		console.log('updated messages:', messageState);
	}

	function callbackMessageDelete(messageId) {
		const messages = messageState.filter(
			(_message) => _message.id !== messageId
		);
		setMessageState(messages);
	}

	function callbackSetSelectedMember(memberId) {
		setSelectedMember(memberId);
	}

	function getSelectedMemberId() {
		if (selectedMember !== undefined) {
			console.log('selected member ID =', selectedMember);
			const member = getMember(selectedMember);
			console.log('member is ', member);
			if (member !== undefined) {
				console.log('not undefined and is', selectedMember);
				return selectedMember.id;
			}
		}
	}

	function callbackClearForm() {
		setMembershipState([]);
		setMembershipData([]);
		setMemberDataState([]);
		setMemberData([]);
		setSelectedMember();
		addMessage('The form has been reset');
	}

	function callbackSubmitForm() {
		addMessage('m0');
	}

	function callbackMembershipUpdate(data) {
		setMembershipState(data);
		setMembershipData(data);
		//navigate('/');
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
					<Route
						path="membership"
						element={
							<Membership
								data={membershipState}
								updateCallback={callbackMembershipUpdate}
								updateCallbackCancel={() => navigate('/')}
							/>
						}
					/>
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
								membershipState={membershipState}
							/>
						</RequireData>
					}
				>
					<Route index element={<MemberIndex />} />
					<Route path="add" element={<MemberAdd />} />
					<Route path="edit/:member" element={<MemberEdit />} />
					<Route
						path="view/:member"
						element={
							<MemberView callbackSelected={callbackSetSelectedMember} />
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
