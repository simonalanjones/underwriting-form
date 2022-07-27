import { Outlet, Link } from 'react-router-dom';
import Navigation from '../navigation';
import SubmitBar from '../submitBar';
import Messages from '../../messages';
import MembershipInfo from '../membershipInfo';
import Memberlist from '../memberList';

export default function MemberLayout({
	callbackSubmitForm,
	callbackClearForm,
	messageState,
	callbackMessageDelete,
}) {
	return (
		<>
			<Navigation />
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
							<MembershipInfo />
							<Link to="/membership" className="btn btn-secondary mt-3">
								Update
							</Link>
						</div>
						<Memberlist />
					</div>

					<div className="col-8 ps-5">
						<Outlet />
					</div>
				</div>
			</div>

			<footer className="footer py-3 mt-5">
				<div className="container">
					<span className="text-muted">
						This is a demonstration application, no data will be sent on
						submission.
					</span>
				</div>
			</footer>
		</>
	);
}
