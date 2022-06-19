import {
	Routes,
	Route,
	Outlet,
	NavLink,
	Link,
	useNavigate,
} from 'react-router-dom';

import { useEffect, useState } from 'react';
import useLocalStorage from './useLocalStorage';
import Agent from './routes/agent';
//import About from './routes/about';
import Members from './routes/members';
import Membership from './routes/membership';
import AddMember from './routes/addMember';
import EditMember from './routes/editMember';
import ViewMember from './routes/viewMember';
import AddCondition from './routes/addCondition';
import EditCondition from './routes/editCondition';
import MembershipInfo from './components/membershipInfo';
import Memberlist from './components/memberList';
import SubNavigation from './components/subNavigation';

const App = () => {
	const navigate = useNavigate();

	// const dummy = {
	// 	name: 'simon jones....',
	// 	email: 'simonajones@gmail.com',
	// 	dept: 'Acquisition',
	// };

	const [agentData, setAgentData] = useLocalStorage('agentData', []);
	const [agentState, setAgentState] = useState(agentData);

	const [membershipData, setMembershipData] = useLocalStorage(
		'membershipData',
		[]
	);
	console.log('app render', agentData);

	useEffect(() => {
		console.log('agent data is:', agentState);
		setAgentData(agentState);
		console.log('getting back', agentData);
	}, [agentState, setAgentData, agentData]);

	//const [agentState, setAgentState] = useState(agentData);
	const [membershipState, setMembershipState] = useState(membershipData);

	function AgentUpdate(data) {
		console.log('agent callback...', data);
		setAgentState(data);
		//setAgentData('not a dummy');
		//delay(100).then(() => navigate(`/members/view/${uniqueId}`));

		// if (membershipData.length === 0) {
		// 	delay(100).then(() => navigate(`/membership`));
		// 	//navigate('/membership');
		// } else {
		// 	delay(100).then(() => navigate(`/members`));
		// }
	}

	function callbackMembershipState(data) {
		setMembershipState(data);
		setMembershipData(data);
	}

	const Layout = () => {
		return (
			<>
				<div className="container">
					<h1>base layout</h1>
					<Navigation agent={agentData} />
					<SubNavigation />
					<Outlet />
				</div>
			</>
		);
	};

	const MemberLayout = () => {
		const [memberData] = useLocalStorage('memberData', []);
		return (
			<>
				<div className="container">
					<h1>member layout</h1>
					<Navigation agent={agentData} />
					<SubNavigation />

					{Object.keys(memberData).length > 0 && (
						<div className="row">
							<div className="col-4">
								<div className="mb-5">
									<MembershipInfo data={membershipData} />
								</div>
								<Memberlist members={memberData} />
								<br />

								<Link to="/members/add" className="btn btn-primary">
									Add member
								</Link>
							</div>

							<div className="col-8">
								<Outlet />
							</div>
						</div>
					)}
				</div>
			</>
		);
	};

	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="agent" element={<Agent callback={AgentUpdate} />} />
				</Route>

				<Route path="/members" element={<MemberLayout />}>
					<Route
						index
						element={
							<main style={{ padding: '1rem' }}>
								<p>Select a member</p>
							</main>
						}
					/>
					<Route path="add" element={<AddMember />} />
					<Route path="view/:member" element={<ViewMember />} />
					<Route path="edit/:member" element={<EditMember />} />
				</Route>
				<Route path="*" element={<NoMatch />} />
			</Routes>
		</>
	);
};

const NoMatch = () => {
	return <h1>Page not found!</h1>;
};

const Navigation = ({ agent }) => {
	//console.log('navigation fires');
	return (
		<header className="p-3 mb-3 border-bottom">
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
	);
};

function delay(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

const RequireAuth = ({ children }) => {
	const navigate = useNavigate();
	const [agentData] = useLocalStorage('agentData', []);

	useEffect(() => {
		if (agentData.name === undefined || agentData.name === '') {
			console.log('empty data');
			navigate('/agent');
		}
	}, [navigate, agentData]);

	return (
		<>
			<p>in require auth</p>
			{children}
		</>
	);
};

export default App;
