export default function Toast(params) {
	const id = params.id;
	const body = params.body;

	return (
		<div
			className="toast bg-light"
			role="alert"
			aria-live="assertive"
			aria-atomic="true"
			id={id}
			data-bs-delay="10000"
		>
			<div className="toast-header bg-primary text-white">
				<strong className="me-auto">Notification</strong>
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
