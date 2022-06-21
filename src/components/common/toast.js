export default function Toast(params) {
	const id = params.id;
	const body = params.body;
	//const type = params.type;
	//const delay = params.delay;

	return (
		<div
			className="toast bg-light"
			role="alert"
			aria-live="assertive"
			aria-atomic="true"
			id={id}
			data-bs-delay="5000"
		>
			<div className="toast-header">
				<strong className="me-auto">Notification</strong>
				{/* <small>999 mins ago</small> */}
				<button
					type="button"
					className="btn-close"
					data-bs-dismiss="toast"
					aria-label="Close"
				></button>
			</div>
			<div className="toast-body">{body}</div>
		</div>
	);
}
