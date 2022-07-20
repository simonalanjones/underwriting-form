import { useParams, Outlet, Link } from 'react-router-dom';
import Navigation from '../navigation';
import SubmitBar from '../submitBar';
import Messages from '../messages';
import MembershipInfo from '../membershipInfo';
import Memberlist from '../memberList';
import { memberCount, getMembers } from '../../services/memberDataService';

//
export default function MemberLayout({
	agentState,
	callbackSubmitForm,
	callbackClearForm,
	messageState,
	callbackMessageDelete,
	membershipState,
}) {
	//console.log('member data:', getMembers());
	const params = useParams();
	return (
		<>
			<Navigation agent={agentState} />
			<SubmitBar
				submitCallback={callbackSubmitForm}
				clearCallback={callbackClearForm}
			/>

			<Messages
				messageState={messageState}
				callbackMessageDelete={callbackMessageDelete}
			/>

			<div className="container mt-5">
				<div className="row">
					<div className="col-4-lg col">
						<div className="mb-5">
							<MembershipInfo data={membershipState} />
							<Link to="/membership" className="btn btn-secondary mt-3">
								Update
							</Link>
						</div>
						{memberCount() > 0 && (
							<Memberlist
								members={getMembers()}
								selectedId={params.member || null}
							/>
						)}
					</div>

					<div className="col-8 ps-5">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
}
