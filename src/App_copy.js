import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function App() {
	return (
		<>
			<div className="container">
				<p>App.js</p>
				<nav className="nav">
					<Link className="nav-link" to="members">
						Member list
					</Link>
					<Link className="nav-link" to="about">
						About
					</Link>
				</nav>
				<Outlet />
			</div>
		</>
	);
}

export default App;
