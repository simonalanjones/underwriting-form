import {
	Routes,
	Route,
	Outlet,
	Link,
	useNavigate,
	Navigate,
	useParams,
} from 'react-router-dom';

import { useState, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import Agent from './routes/agent';
import Membership from './routes/membership';
import AddMember from './routes/addMember';
import EditMember from './routes/editMember';
import ViewMember from './routes/viewMember';
import AddCondition from './routes/addCondition';
import EditCondition from './routes/editCondition';
// move button functions out of subnav and use callbacks in App here
import SubNavigation from './components/subNavigation';
//
import MembershipInfo from './components/membershipInfo';
import Memberlist from './components/memberList';

// import { Toast } from 'bootstrap';
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

	useEffect(() => {
		document.body.classList.add('bg-light');
		// console.log(Toast);
		// var toastEl = document.getElementById('toastContainer');
		// const bsToast = new Toast(toastEl);
		// bsToast.show();
	}, []);

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
		console.log('callback!');
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
		}
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
				<SubmitBar />
				{/* <SubNavigation /> */}

				<div className="container mt-5" id="toastContainer">
					<div className="row">
						<div className="col-4">
							<div className="mb-5">
								<MembershipInfo data={membershipState} />
							</div>
							{}
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
					<Route
						index
						element={
							<MemberIndex />
							// add MemberIndex comp that looks for any members
							// if not then offer member add page
							// else something like below
							//<main style={{ padding: '1rem' }}>
							//	<p>Select a member</p>
							//</main>
						}
					/>
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

const SubmitBar = () => {
	return (
		<div className="px-3 py-2 border-bottom mb-3 shadow-sm">
			<div className="container d-flex flex-wrap justify-content-end">
				<div className="text-end">
					<button type="button" className="btn btn-primary me-2">
						Submit
					</button>
					<button type="button" className="btn btn-light text-dark ">
						Clear
					</button>
				</div>
			</div>
		</div>
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
			{/* <div className="px-3 py-2 border-bottom mb-3 shadow-sm">
				<div className="container d-flex flex-wrap justify-content-end">
					<div class="text-end">
						<button type="button" class="btn btn-primary me-2">
							Submit
						</button>
						<button type="button" class="btn btn-light text-dark ">
							Clear
						</button>
					</div>
				</div>
			</div> */}
		</>
	);
};

export default App;
