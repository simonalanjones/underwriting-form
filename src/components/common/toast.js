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
		>
			<div className="toast-header">
				<strong className="me-auto">Bootstrap</strong>
				<small>999 mins ago</small>
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
