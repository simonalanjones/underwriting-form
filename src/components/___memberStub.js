import { Link } from 'react-router-dom';
import MemberConditions from '../components/memberConditions';

function MemberStub({ member }) {
	return (
		member !== null &&
		member !== undefined && (
			<>
				<div className="card w-100 bg-light">
					<div className="card-body">
						<div className="pt-2 pb-3">
							<div className="dropdown text-end">
								<Link
									to="#"
									className="link-dark text-decoration-none dropdown-toggle"
									id="dropdownUser"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								></Link>
								<ul
									className="dropdown-menu text-small"
									aria-labelledby="dropdownUser"
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
											to={`/members/delete/${member.id}`}
											className="dropdown-item"
											data-bs-toggle="modal"
											data-bs-target="#deleteMemberModal"
										>
											Delete member
										</Link>
									</li>
								</ul>
							</div>
						</div>
						{/* loop through member conditions rendering a member condition stub passing in member id */}
						<MemberConditions member={member} />
					</div>
				</div>
			</>
		)
	);
}

export default MemberStub;
