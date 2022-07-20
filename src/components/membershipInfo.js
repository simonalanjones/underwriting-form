import formattedDateString from '../common/formattedDate';
function MembershipInfo({ data }) {
	return (
		<>
			{Object.keys(data).length > 0 && (
				<>
					<h6 className="pb-1">Membership</h6>
					<ul className="list-group shadow-sm">
						<li className="list-group-item">
							<div className="ms-2 me-auto">
								Membership No.
								<h6 className="fw-bold">{data.membershipNumber}</h6>
							</div>
						</li>
						<li className="list-group-item">
							<div className="ms-2 me-auto">
								Switch from
								<h6 className="fw-bold">{data.memberSwitchFrom}</h6>
							</div>
						</li>
						<li className="list-group-item">
							<div className="ms-2 me-auto">
								Date completed
								<h6 className="fw-bold">
									{formattedDateString(data.dateCompleted)}
								</h6>
							</div>
						</li>
					</ul>
				</>

				// <div className="row row-cols-1 row-cols-md-3 pb-4">
				// 	<div className="col d-flex justify-content-center">
				// 		<p>
				// 			Membership:&nbsp;
				// 			<strong>{data.membershipNumber}</strong>
				// 		</p>
				// 	</div>

				// 	<div className="col d-flex justify-content-center">
				// 		<p>
				// 			Switching from:&nbsp;
				// 			<strong>{data.memberSwitchFrom}</strong>
				// 		</p>
				// 	</div>

				// 	<div className="col d-flex justify-content-center">
				// 		<p>
				// 			Date completed:&nbsp;
				// 			<strong>{data.dateCompleted}</strong>
				// 		</p>
				// 	</div>
				// </div>
			)}
		</>
	);
}

export default MembershipInfo;
