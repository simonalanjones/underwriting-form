//import MemberStub from '../components/memberStub';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Modal from '../components/common/modal';
import MemberConditions from '../components/memberConditions';
import MemberIcon from '../components/common/memberIcon';

export default function MemberView({
	member,
	callbackDeleteCondition,
	callbackDeleteMember,
	callbackSelected,
}) {
	useEffect(() => {
		callbackSelected(member.id);
	}, [callbackSelected, member.id]);

	return (
		<>
			<Modal
				title="Confirm delete"
				body="Are you sure you want to delete this member?"
				actionCallback={() => callbackDeleteMember(member.id)}
				actionText="Confirm Delete"
				id={`deleteMemberModal${member.id}`}
			/>

			<h6 className="pb-1">Member</h6>
			<div className="border bg-white rounded px-4 pt-4 pb-4 mb-4 shadow-sm">
				<div className="row align-items-start">
					<div className="col">&nbsp;</div>
					<div className="col text-center">
						<MemberIcon width="64" height="64" />
						<p className="fs-4 pb-0 mb-0">
							{member.userFirstName}&nbsp;{member.userLastName}
						</p>
						<p className="fs-6 pb-0 mb-0">
							<small>DOB: {member.dateOfBirth}</small>
						</p>
					</div>
					<div className="col text-end">
						<button
							className="btn btn-sm btn btn-light-secondary dropdown-toggle"
							id={`dropdownMember${member.id}`}
							data-bs-toggle="dropdown"
							aria-expanded="false"
							type="button"
						>
							Options
						</button>

						<ul
							className="dropdown-menu"
							aria-labelledby={`dropdownMember${member.id}`}
						>
							<li>
								<Link
									to={`/members/edit/${member.id}`}
									className="dropdown-item"
								>
									Edit member
								</Link>
							</li>
							<li>
								<Link
									to="/"
									className="dropdown-item"
									data-bs-toggle="modal"
									data-bs-target={`#deleteMemberModal${member.id}`}
								>
									Delete member
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<MemberConditions
				member={member}
				deleteConditionCallback={callbackDeleteCondition}
			/>

			<div className="d-flex gap-2">
				<Link
					to={`/members/add-condition/${member.id}`}
					className="btn btn btn-secondary"
				>
					Add condition
				</Link>
			</div>
		</>
	);
}
