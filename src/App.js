import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import { useState, useEffect } from 'react';

import {
	getMembers,
	getMember,
	memberCount,
} from './services/memberDataService.js';
import useLocalStorage from './useLocalStorage';
import Agent from './routes/agent';
import Membership from './routes/membership';

import Layout from './components/layouts/layout';
import MemberLayout from './components/layouts/memberLayout';
import MemberView from './components/route/memberView';
import MemberIndex from './components/route/memberIndex';
import MemberEdit from './components/route/memberEdit';
import MemberAdd from './components/route/memberAdd';
import ConditionAdd from './components/route/conditionAdd';
import ConditionEdit from './components/route/conditionEdit';

const App = () => {
	//console.log('memberData = ', getMember('l5mk1sup937'));
	console.log('member count = ', memberCount());

	const navigate = useNavigate();

	const [agentData, setAgentData] = useLocalStorage('agentData', []);
	const [agentState, setAgentState] = useState(agentData);
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

	function hasMembershipData() {
		return Object.keys(membershipData).length > 0;
	}

	function hasAgentData() {
		return Object.keys(agentData).length > 0;
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

	function callbackAgentUpdate(data) {
		setAgentState(data);
		setAgentData(data);
		if (hasMembershipData()) {
			navigate('/');
		} else {
			navigate('membership');
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
		navigate('/');
	}

	//

	// can't move this function as dependancy on agentData etc
	const Index = () => {
		let navigateUrl = '';

		// this will be exported to js function like memberData
		if (!hasAgentData()) {
			navigateUrl = '/agent';
			// this will be exported to js function like memberData
		} else if (!hasMembershipData()) {
			navigateUrl = '/membership';
		} else {
			const selectedMemberId = getSelectedMemberId();
			if (selectedMemberId !== undefined) {
				navigateUrl = `/members/view/${selectedMemberId}`;
			} else {
				navigateUrl = '/members';
			}
		}
		return <Navigate to={navigateUrl} />;
	};

	// check for sufficient data in agent and membership here
	const RequireData = ({ children }) => {
		if (!hasAgentData()) {
			return <Navigate to="/agent" />;
		} else if (!hasMembershipData()) {
			return <Navigate to="/membership" />;
		} else {
			return children;
		}
	};

	return (
		<>
			<Routes>
				<Route
					element={
						<Layout
							agentState={agentState}
							messageState={messageState}
							callbackMessageDelete={callbackMessageDelete}
						/>
					}
				>
					<Route path="/" element={<Index />} />
					<Route
						path="agent"
						element={
							<Agent
								agent={agentState}
								updateCallback={callbackAgentUpdate}
								updateCallbackCancel={() => navigate('/')}
							/>
						}
					/>
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
								agentState={agentState}
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
