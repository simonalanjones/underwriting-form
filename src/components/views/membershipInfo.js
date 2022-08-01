import formattedDateString from '../../common/formattedDate';
import { getMembership } from '../../services/membershipData';
import { Link } from 'react-router-dom';
function MembershipInfo() {
	const data = getMembership();

	const headingStyle = {
		textTransform: 'uppercase',
		fontSize: '0.85em',
		letterSpacing: '1px',
	};

	return (
		<>
			{Object.keys(data).length > 0 && (
				<>
					<div className="container shadow-sm bg-white pt-3 px-4 border-top">
						<div className="d-flex justify-content-between">
							<h6 className="pb-4 mt-2" style={headingStyle}>
								Membership
							</h6>
						</div>

						<div className="px-0 pb-3">
							<dl>
								<dd className="mb-0">Membership No.</dd>
								<dt className="mb-4">{data.membershipNumber}</dt>
							</dl>

							<dl>
								<dd className="mb-0">Switch from</dd>
								<dt className="mb-4">{data.memberSwitchFrom}</dt>
							</dl>
							<dl>
								<dd className="mb-0">Date completed</dd>
								<dt>{formattedDateString(data.dateCompleted)}</dt>
							</dl>
						</div>
						<div className="pb-3">
							<Link to="/membership" className="btn btn-sm btn-secondary">
								Edit
							</Link>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default MembershipInfo;
