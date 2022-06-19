import {
	Routes,
	Route,
	Outlet,
	Link,
	useNavigate,
	Navigate,
	useParams,
} from 'react-router-dom';
import Modal from './components/common/modal.js';
import Toast from './components/common/toast.js';
import { useState, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import Agent from './routes/agent';
import Membership from './routes/membership';
import AddMember from './routes/addMember';
import EditMember from './routes/editMember';
import ViewMember from './routes/viewMember';
import AddCondition from './routes/addCondition';
import EditCondition from './routes/editCondition';
import MembershipInfo from './components/membershipInfo';
import Memberlist from './components/memberList';
import { Toast as BootstrapToast } from 'bootstrap';

const App = () => {
	const navigate = useNavigate();
	const [agentData, setAgentData] = useLocalStorage('agentData', []);
	const [agentState, setAgentState] = useState(agentData);
	const [membershipData, setMembershipData] = useLocalStorage(
		'membershipData',
		[]
	);
	const [membershipState, setMembershipState] = useState(membershipData);
	const [memberData, setMemberData] = useLocalStorage('memberData', []);
	const [memberDataState, setMemberDataState] = useState(memberData);
	const [messageState, setMessageState] = useState([]);

	useEffect(() => {
		document.body.classList.add('bg-light');
	}, []);

	function addMessage(messageText) {
		const message = {
			id: new Date().getTime().toString(36) + new Date().getUTCMilliseconds(),
			body: messageText,
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

	function getMemberById(id) {
		return memberDataState.find((element) => element.id === id);
	}

	function hasMembershipData() {
		return Object.keys(membershipData).length > 0;
	}

	function hasAgentData() {
		return Object.keys(agentData).length > 0;
	}

	function hasMemberData() {
		return Object.keys(memberData).length > 0;
	}

	function callbackAgentUpdate(data) {
		setAgentState(data);
		setAgentData(data);
		if (hasMembershipData()) {
			navigate('members');
		} else {
			navigate('membership');
		}
	}

	function callbackClearForm() {
		console.log('going to clear form....');
		setMembershipState([]);
		setMembershipData([]);
		setMemberDataState([]);
		setMemberData([]);
		//navigate('membership');
	}

	function callbackSubmitForm() {
		addMessage('m0');
	}

	function callbackMembershipUpdate(data) {
		setMembershipState(data);
		setMembershipData(data);
		if (hasAgentData()) {
			navigate('members');
		} else {
			navigate('agent');
		}
	}

	function callbackMemberAdd(data) {
		const members = [...memberData, data];
		setMemberData(members);
		setMemberDataState(members);
		const lastMemberId = data.id;
		navigate(`members/view/${lastMemberId}`);
	}

	function callbackMemberEdit(member) {
		const members = memberData.map((element) =>
			element.id !== member.id ? element : member
		);

		setMemberData(members);
		setMemberDataState(members);
		navigate(`members/view/${member.id}`);
	}

	function callbackMemberDelete(memberId) {
		const members = memberData.filter((_member) => _member.id !== memberId);
		setMemberData(members);
		setMemberDataState(members);
		navigate('members');
	}

	function callbackConditionAdd(member, condition) {
		member.conditions.push(condition);

		const updatedData = memberData.map((_member) =>
			_member.id !== member.id ? _member : member
		);

		setMemberData(updatedData);
		setMemberDataState(updatedData);
		navigate(`members/view/${member.id}`);
	}

	function callbackConditionEdit(condition, member) {
		member.conditions = member.conditions.map((_condition) =>
			_condition.id === condition.id ? condition : _condition
		);

		const updatedMemberData = memberData.map((_member) =>
			_member.id !== member.id ? _member : member
		);

		setMemberData(updatedMemberData);
		setMemberDataState(updatedMemberData);
		navigate(`members/view/${member.id}`);
	}

	function callbackConditionDelete(condition, member) {
		member.conditions = member.conditions.filter(
			(_condition) => _condition.id !== condition.id
		);

		const updatedMemberData = memberData.map((_member) =>
			_member.id !== member.id ? _member : member
		);

		setMemberData(updatedMemberData);
		setMemberDataState(updatedMemberData);
	}

	const Index = () => {
		if (!hasAgentData()) {
			return <Navigate to="/agent" />;
		} else if (!hasMembershipData()) {
			return <Navigate to="/membership" />;
		} else {
			return <Navigate to="/members" />;
		}
	};

	// check for sufficient data in agent and membership here
	const RequireData = ({ children }) => {
		console.log('requireData');
		if (!hasAgentData()) {
			return <Navigate to="/agent" />;
		} else if (!hasMembershipData()) {
			return <Navigate to="/membership" />;
		} else {
			return children;
		}
	};

	const MemberIndex = () => {
		if (!hasMemberData()) {
			return (
				<AddMember
					callbackUpdate={callbackMemberAdd}
					callbackCancel={() => {
						navigate('members');
					}}
				/>
			);
		} else
			return (
				<div className="border bg-white rounded px-4 pt-4 pb-4 shadow-sm">
					Select a member to continue.
				</div>
			);
	};

	const MemberView = () => {
		const params = useParams();
		const member = getMemberById(params.member);
		return (
			<ViewMember
				member={member}
				callbackDeleteCondition={callbackConditionDelete}
			/>
		);
	};

	const MemberAdd = () => {
		return (
			<AddMember
				callbackUpdate={callbackMemberAdd}
				callbackCancel={() => {
					navigate('members');
				}}
			/>
		);
	};

	const MemberEdit = () => {
		const params = useParams();
		const member = getMemberById(params.member);
		return (
			<EditMember
				member={member}
				callbackUpdate={callbackMemberEdit}
				callbackCancel={() => {
					navigate(`members/view/${member.id}`);
				}}
			/>
		);
	};

	const ConditionAdd = () => {
		const params = useParams();
		const member = getMemberById(params.member);
		return (
			<AddCondition
				member={member}
				callbackUpdate={callbackConditionAdd}
				callbackCancel={() => {
					navigate(`members/view/${member.id}`);
				}}
			/>
		);
	};

	const ConditionEdit = () => {
		const params = useParams();
		const member = getMemberById(params.member);
		const condition = member['conditions'].find(
			(element) => element.id === params.condition
		);
		return (
			<EditCondition
				callbackUpdate={callbackConditionEdit}
				callbackCancel={() => {
					navigate(`members/view/${member.id}`);
				}}
				condition={condition}
				member={member}
			/>
		);
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
						<div className="col-4">
							<div className="mb-5">
								<MembershipInfo data={membershipState} />
								<Link to="/membership" className="btn btn-secondary mt-3">
									Update
								</Link>
							</div>

							{Object.keys(memberData).length > 0 && (
								<Memberlist
									members={memberDataState}
									selectedId={params.member || null}
									callbackDeleteMember={callbackMemberDelete}
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

const Messages = ({ messageState, callbackMessageDelete }) => {
	useEffect(() => {
		const options = {
			animation: true,
			delay: 2500,
			autohide: false,
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
