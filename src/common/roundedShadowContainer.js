export default function ShadowBox({ children }) {
	return (
		<div className="border bg-white rounded px-4 pt-4 mb-4 pb-4 shadow-sm">
			{children}
		</div>
	);
}
