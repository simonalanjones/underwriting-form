import { Link } from 'react-router-dom';
import Modal from '../../common/modal';
import MemberIcon from '../../common/memberIcon';
import formattedDateString from '../../common/formattedDate';

export default function MemberView({ member, callbackDeleteMember }) {
	return (
		<>
			<Modal
				title="Confirm delete"
				body="Are you sure you want to delete this member?"
				actionCallback={() => callbackDeleteMember(member.id)}
				actionText="Confirm Delete"
				id={`deleteMemberModal${member.id}`}
			/>

			{/* <h6 className="pb-1">Member</h6> */}
			<div className="bg-white px-4 pt-4 pb-4 mb-4 shadow-sm">
				<div className="row align-items-start">
					<div className="col">&nbsp;</div>
					<div className="col text-center">
						<MemberIcon width="64" height="64" />
						<p className="fs-4 pb-0 mb-0">
							{member.userFirstName}&nbsp;{member.userLastName}
						</p>
						<div className="fs-6 pb-0 mb-0">
							<h6>{formattedDateString(member.dateOfBirth)}</h6>
						</div>
						<p>{member.relation}</p>
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
							className="dropdown-menu dropdown-menu-end"
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
							<li>
								<hr className="dropdown-divider"></hr>
							</li>
							<li>
								<Link
									to={`/members/add-condition/${member.id}`}
									className="dropdown-item"
								>
									Add condition
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}
