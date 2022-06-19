import React from 'react';
import Modal from './common/modal.js';
import { useNavigate, Link } from 'react-router-dom';
//import { useState, useEffect } from 'react';

function Memberlist({ members, selectedId, callbackDeleteMember }) {
	const navigate = useNavigate();
	//const [selectedIndex, setSelectedIndex] = useState(null);

	function handleDeleteMember() {
		callbackDeleteMember(selectedId);
	}

	// useEffect(() => {
	// 	//console.log('selected', selectedId);
	// 	//	if (selectedId !== undefined && selectedId !== null) {
	// 	//	setSelectedIndex(selectedId);
	// }, [selectedId]);

	return (
		<>
			<Modal
				title="Confirm delete"
				body="Are you sure you want to delete this member?"
				actionCallback={handleDeleteMember}
				actionText="Confirm Delete"
				id="deleteMemberModal"
			/>

			{/* {Object.keys(data).length > 0 && ( */}
			<h6 className="pb-1">Members</h6>

			<ul className="list-group shadow-sm">
				{members.map((member, index) => (
					<li
						key={index}
						onClick={() => navigate(`/members/view/${member.id}`)}
						className={
							member.id === selectedId
								? 'list-group-item active'
								: 'list-group-item'
						}
					>
						<div className="d-flex">
							<div className="">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="bi bi-person-fill"
									viewBox="0 0 16 16"
								>
									<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
								</svg>
								&nbsp;&nbsp;
							</div>

							<div className="pt-1 pb-1">
								<h6>{`${member.userFirstName} ${member.userLastName}`}</h6>
								<div>
									{member.conditions.length} condition
									{member.conditions.length !== 1 && 's'}
									&nbsp;added
								</div>
							</div>
						</div>
					</li>

					// <li
					// 	key={index}
					// 	className={
					// 		member.id === selectedId
					// 			? 'list-group-item d-flex justify-content-between align-items-center active'
					// 			: 'list-group-item d-flex justify-content-between align-items-center'
					// 	}
					// 	onClick={() => navigate(`/members/view/${member.id}`)}
					// >
					// 	<span>
					// 		<svg
					// 			xmlns="http://www.w3.org/2000/svg"
					// 			width="16"
					// 			height="16"
					// 			fill="currentColor"
					// 			className="bi bi-person-fill"
					// 			viewBox="0 0 16 16"
					// 		>
					// 			<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
					// 		</svg>
					// 		&nbsp;&nbsp;
					// 		{`${member.userFirstName} ${member.userLastName}`}
					// 	</span>
					// 	1 condition
					// 	{member.conditions.length > 0 && (
					// 		<span
					// 			className={
					// 				member.id === selectedId
					// 					? 'badge bg-secondary'
					// 					: 'badge bg-secondary'
					// 			}
					// 		>
					// 			{member.conditions.length}
					// 		</span>
					// 	)}
					// </li>
				))}
			</ul>
			<div className="mt-4">
				<button
					className="btn btn-secondary dropdown-toggle"
					id="dropdownUser"
					data-bs-toggle="dropdown"
					aria-expanded="false"
					type="button"
				>
					Member options
				</button>
				<ul className="dropdown-menu" aria-labelledby="dropdownUser">
					<li>
						<Link to="/members/add" className="dropdown-item">
							Add member
						</Link>
					</li>
					{selectedId !== null && (
						<>
							<li>
								<hr className="dropdown-divider" />
							</li>

							<li>
								<Link
									to={`/members/edit/${selectedId}`}
									className="dropdown-item"
								>
									Edit selected member
								</Link>
							</li>
							<li>
								<Link
									to={`/members/delete/${selectedId}`}
									className="dropdown-item"
									data-bs-toggle="modal"
									data-bs-target="#deleteMemberModal"
								>
									Delete selected member
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</>
	);
}

export default Memberlist;
