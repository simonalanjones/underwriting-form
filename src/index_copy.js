import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import Home from './routes/home';
import Agent from './routes/agent';
import About from './routes/about';
import Members from './routes/members';
import AddMember from './routes/addMember';
import EditMember from './routes/editMember';
import ViewMember from './routes/viewMember';
import AddCondition from './routes/addCondition';
import EditCondition from './routes/editCondition';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="home" element={<Home />} />
					<Route path="agent" element={<Agent />} />
					<Route path="about" element={<About />} />
					<Route path="members/edit/:member" element={<EditMember />} />
					<Route path="members/view/:member" element={<ViewMember />} />
					<Route path="members/add-member" element={<AddMember />} />
					<Route
						path="members/add-condition/:member"
						element={<AddCondition />}
					/>
					<Route
						path="members/edit-condition/:condition"
						element={<EditCondition />}
					/>
					<Route path="members" element={<Members />}></Route>

					<Route path="members" element={<Members />}>
						{/* <Route path="add-member" element={<AddMember />} /> */}
						{/* <Route path="edit/:member" element={<EditMember />} /> */}
						<Route index element={<p>INDEX - Select a member</p>} />
					</Route>

					<Route
						path="*"
						element={
							<main style={{ padding: '1rem' }}>
								<p>There's nothing here!</p>
							</main>
						}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
