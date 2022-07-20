function Alert({ message, type }) {
	return (
		<div
			className={`container alert alert-${type} alert-dismissible fade show`}
			role="alert"
		>
			{type === 'success' && (
				<button
					type="button"
					className="btn-close"
					data-bs-dismiss="alert"
					aria-label="Close"
				></button>
			)}
			<strong>{message}</strong>
		</div>
	);
}

export default Alert;
