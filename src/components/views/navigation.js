import { Link } from 'react-router-dom';
import { getAgent, hasAgent } from '../../services/agentData';
import logo from '../../../src/axa-logo';

export default function Navigation() {
	const agent = getAgent();
	return (
		<>
			<header className="p-3 mb-0 border-bottom">
				<div className="container">
					<div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
						<img src={logo} alt="" width="45" height="45" />

						<ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
							<li>
								<Link to={'/'} className="nav-link px-2 link-secondary">
									Conditional Switch
								</Link>
							</li>
						</ul>
						{hasAgent() && (
							<div className="dropdown text-end">
								<Link
									to="/agent"
									className="d-block link-dark text-decoration-none"
								>
									{agent.agentName}&nbsp;({agent.agentDept})
								</Link>
							</div>
						)}
					</div>
				</div>
			</header>
		</>
	);
}
