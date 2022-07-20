export default function SubscriberCheck({ callback }) {
	const handleChange = (e) => {
		callback(e.target.checked);
	};
	return (
		<>
			<div className="alert alert-warning" role="alert">
				<small>READ TO SUBSCRIBER:</small>
				&nbsp; It is important to disclose all material facts and not doing so
				may result in claims not being paid or possibly a cancellation of your
				cover. If you have any doubt whether a fact would be important, please
				disclose it.&nbsp;&nbsp;
				<input
					type="checkbox"
					name="subscriber"
					className="form-check-input"
					id="subscriber"
					onChange={handleChange}
				/>
			</div>
		</>
	);
}
