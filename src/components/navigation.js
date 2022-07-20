import { Link } from 'react-router-dom';

export default function Navigation({ agent }) {
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
}
