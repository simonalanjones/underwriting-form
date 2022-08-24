import MemberFields from './forms/memberFields';

export default function AddMember({
	callbackUpdate,
	callbackCancel,
	hasSubscriber,
	postback,
}) {
	const handleSubmit = (fields) => {
		let uniqueId =
			new Date().getTime().toString(36) + new Date().getUTCMilliseconds();

		const member = {
			id: uniqueId,
			userFirstName: fields.userFirstName,
			userLastName: fields.userLastName,
			title: fields.title,
			relation: fields.relation,
			phoneNumber: fields.phoneNumber,
			dateOfBirth: fields.dateOfBirth,
			conditions: [],
		};

		callbackUpdate(member);
		postback();
	};

	const handleCancel = () => {
		callbackCancel();
	};

	const headingStyle = {
		textTransform: 'uppercase',
		fontSize: '0.85em',
		letterSpacing: '1px',
	};
	return (
		<>
			<div className="container shadow-sm bg-white pt-3 px-5 bg-white">
				<h6 className="mt-2" style={headingStyle}>
					Add member
				</h6>
				<MemberFields
					handleCancel={handleCancel}
					handleSubmit={handleSubmit}
					hasSubscriber={hasSubscriber}
				/>
			</div>
		</>
	);
}
