import React from 'react';
import Modal from './common/modal.js';
import MemberIcon from './common/memberIcon.js';
import { useNavigate, Link } from 'react-router-dom';

function Memberlist({ members, selectedId, callbackDeleteMember }) {
	const navigate = useNavigate();

	function handleDeleteMember() {
		callbackDeleteMember(selectedId);
	}

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
								<MemberIcon width="16" height="16" />
								&nbsp;&nbsp;
							</div>

							<div className="pt-1 pb-1">
								<h6>{`${member.userFirstName} ${member.userLastName}`}</h6>
								<div className="d-sm-none d-xs-none d-md-block">
									{member.conditions.length} condition
									{member.conditions.length !== 1 && 's'}
									&nbsp;added
								</div>
							</div>
						</div>
					</li>
				))}
			</ul>
			<div className="mt-4">
				<Link to="/members/add" className="btn btn-secondary">
					Add member
				</Link>
			</div>
		</>
	);
}

export default Memberlist;
