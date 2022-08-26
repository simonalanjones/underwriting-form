export default function UIContainer(props) {
	const headingStyle = {
		textTransform: 'uppercase',
		fontSize: '0.85em',
		letterSpacing: '1px',
	};

	const widthStyle =
		props.type === 'slim'
			? {
					width: '100%',
					maxWidth: 500,
			  }
			: {
					width: '100%',
			  };

	const heading = props.title ? (
		<h6 className="mt-2" style={headingStyle}>
			{props.title}
		</h6>
	) : (
		''
	);

	return (
		<div
			className="container shadow-sm bg-white pt-3 px-5 pb-3 bg-white"
			style={widthStyle}
		>
			{heading}
			{props.children}
		</div>
	);
}
