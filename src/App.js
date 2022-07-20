import {
	Routes,
	Route,
	Outlet,
	Link,
	useNavigate,
	Navigate,
	useParams,
} from 'react-router-dom';
import Modal from './common/modal';
import Toast from './common/toast';
import { useState, useEffect } from 'react';

import {
	getMembers,
	getMember,
	memberCount,
} from './services/memberDataService.js';
import useLocalStorage from './useLocalStorage';
import Agent from './routes/agent';
import MembershipInfo from './components/membershipInfo';
import Membership from './routes/membership';

import MemberView from './components/route/memberView';
import MemberIndex from './components/route/memberIndex';
import MemberEdit from './components/route/memberEdit';
import MemberAdd from './components/route/memberAdd';
import ConditionAdd from './components/route/conditionAdd';
import ConditionEdit from './components/route/conditionEdit';

import Memberlist from './components/memberList';
import { Toast as BootstrapToast } from 'bootstrap';

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

	const Layout = () => {
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
	};

	const MemberLayout = () => {
		//console.log('member data:', getMembers());
		const params = useParams();
		return (
			<>
				<Navigation agent={agentState} />
				<SubmitBar
					submitCallback={callbackSubmitForm}
					clearCallback={callbackClearForm}
				/>

				<Messages
					messageState={messageState}
					callbackMessageDelete={callbackMessageDelete}
				/>

				<div className="container mt-5">
					<div className="row">
						<div className="col-4-lg col">
							<div className="mb-5">
								<MembershipInfo data={membershipState} />
								<Link to="/membership" className="btn btn-secondary mt-3">
									Update
								</Link>
							</div>
							{memberCount() > 0 && (
								<Memberlist
									members={getMembers()}
									selectedId={params.member || null}
								/>
							)}
						</div>

						<div className="col-8 ps-5">
							<Outlet />
						</div>
					</div>
				</div>
			</>
		);
	};

	return (
		<>
			<Routes>
				<Route element={<Layout />}>
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
							<MemberLayout />
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

const Messages = ({ messageState, callbackMessageDelete }) => {
	useEffect(() => {
		const options = {
			//animation: true,
			//delay: 2500,
			//autohide: false,
		};

		const toastElList = [].slice.call(document.querySelectorAll('.toast'));
		toastElList.map(function (toastEl) {
			toastEl.addEventListener('hidden.bs.toast', function () {
				callbackMessageDelete(toastEl.id);
			});
			const toast = new BootstrapToast(toastEl, options);
			return toast.show();
		});
	}, [callbackMessageDelete]);

	return (
		<div className="px-5">
			{messageState.length > 0 &&
				messageState.map((message, index) => (
					<Toast key={message.id} id={message.id} body={message.body} />
				))}
		</div>
	);
};

const SubmitBar = ({ submitCallback, clearCallback }) => {
	return (
		<>
			<Modal
				title="Confirm reset"
				body="All data will be removed. Are you sure you want to reset this form?"
				actionCallback={() => clearCallback()}
				actionText="Confirm reset"
				id="abandonModal"
			/>

			<Modal
				title="Confirm submit"
				body="Are you sure you want to submit this form?"
				actionCallback={() => submitCallback()}
				actionText="Submit"
				id="submitModal"
			/>

			<div className="px-3 py-2 border-bottom mb-3 shadow-sm">
				<div className="container d-flex flex-wrap justify-content-end">
					<div className="text-end">
						<button
							type="button"
							className="btn btn-primary me-2"
							data-bs-toggle="modal"
							data-bs-target="#submitModal"
						>
							Submit
						</button>
						<button
							type="button"
							className="btn btn-light text-dark"
							data-bs-toggle="modal"
							data-bs-target="#abandonModal"
						>
							Clear
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

const Navigation = ({ agent }) => {
	return (
		<>
			<header className="p-3 mb-0 border-bottom">
				<div className="container">
					<div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
						<ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
							<li>
								<Link to={'/'} className="nav-link px-2 link-secondary">
									Conditional Switch
								</Link>
							</li>
						</ul>
						{Object.keys(agent).length > 0 && (
							<div className="dropdown text-end">
								<Link
									to="/agent"
									className="d-block link-dark text-decoration-none"
								>
									{agent.name}&nbsp;({agent.email})
								</Link>
							</div>
						)}
					</div>
				</div>
			</header>
		</>
	);
};

export default App;
