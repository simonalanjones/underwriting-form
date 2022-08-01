import Modal from '../../common/modal';

export default function SubmitBar({ submitCallback, clearCallback, progress }) {
	return (
		<>
			<Modal
				title="Confirm reset"
				body="All data will be removed. Are you sure you want to reset this form?"
				actionCallback={() => clearCallback()}
				actionText="Confirm reset"
				id="abandonModal"
			/>

			<Modal
				title="Confirm submit"
				body="Are you sure you want to submit this form?"
				actionCallback={() => submitCallback()}
				actionText="Submit"
				id="submitModal"
			/>

			<div className="px-3 py-2 border-bottom mb-3 shadow-sm">
				<div className="container d-flex bd-highlight">
					<div className="p-2 flex-grow-1 bd-highlight"></div>

					<div className="p-2 bd-highlight">
						<button
							type="button"
							className="btn btn-primary me-2"
							data-bs-toggle="modal"
							data-bs-target="#submitModal"
							disabled={progress !== 100}
						>
							Submit
						</button>
						<button
							type="button"
							className="btn btn-light text-dark"
							data-bs-toggle="modal"
							data-bs-target="#abandonModal"
						>
							Clear
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
