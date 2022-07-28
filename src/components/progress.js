export default function Progress({ amount }) {
	const style = {
		width: `${amount}%`,
	};

	const styleHeight = {
		height: '4px',
	};

	return (
		<div className="progress" style={styleHeight}>
			<div
				className="progress-bar progress-bar-striped"
				role="progressbar"
				style={style}
			></div>
		</div>
	);
}
