import { Outlet } from 'react-router-dom';
import Navigation from '../navigation';
import SubmitBar from '../submitBar';
import Messages from '../../messages';
import MembershipInfo from '../membershipInfo';
import Memberlist from '../memberList';

export default function MemberLayout({
	progress,
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
				progress={progress}
			/>

			<Messages
				messageState={messageState}
				callbackMessageDelete={callbackMessageDelete}
			/>

			<div className="container mt-5">
				<div className="row gx-5">
					<div className="col-xs-12 col-lg-4 col-md-12 col-sm-12">
						<div className="mb-5">
							<MembershipInfo />
						</div>
						<Memberlist />
					</div>

					<div className="col-xs-12 col-lg-8 col-md-12 col-sm-12">
						<Outlet />
					</div>
				</div>
			</div>

			<footer className="footer py-3 mt-5">
				<div className="container">
					<p className="text-muted text-start">
						This is a demonstration application, no data will be sent on
						submission.
					</p>
				</div>
			</footer>
		</>
	);
}
