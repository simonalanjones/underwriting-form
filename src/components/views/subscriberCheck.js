import { useEffect, useRef } from 'react';
export default function SubscriberCheck({ callback, checked }) {
	const checkbox1 = useRef();
	const handleChange = (e) => {
		callback(e.target.checked);
	};

	// can pre-check the checkbox if in checked param
	useEffect(() => {
		checkbox1.current.checked = checked;
	}, [checked]);

	return (
		<>
			<div className="alert alert-warning mb-4" role="alert">
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
					ref={checkbox1}
					data-testid="disclaimerCheckSubscriber"
				/>
			</div>
		</>
	);
}
