import { Link } from 'react-router-dom';
import Modal from '../components/modal.js';

function ConditionStub({ condition, handleDelete, member }) {
	const editUrl = `/members/edit-condition/${condition.id}/${member.id}`;

	const hasAnsweredYes = () => {
		return (
			condition.hasConsulatedProvider === 'Yes' ||
			condition.hasTreatmentPlanned === 'Yes' ||
			condition.isTakingMedication === 'Yes'
		);
	};

	return (
		<>
			<Modal
				title="Confirm condition delete"
				body="Are you sure you want to delete this condition?"
				actionText="Confirm Delete"
				actionCallback={() => handleDelete(condition, member)}
				id={`deleteConditionModal${condition.id}`}
			/>

			<div className="border bg-white rounded px-4 pt-4 pb-4 mb-4 shadow-sm">
				<div className="d-flex justify-content-between">
					<h6 className="card-title text-uppercase">{condition.condition}</h6>

					<button
						className="btn btn-sm btn btn-light-secondary dropdown-toggle"
						id={`dropdownCondition${condition.id}`}
						data-bs-toggle="dropdown"
						aria-expanded="false"
						type="button"
					>
						Options
					</button>

					<ul
						className="dropdown-menu text-small"
						aria-labelledby={`dropdownCondition${condition.id}`}
					>
						<li>
							<Link to={editUrl} className="dropdown-item">
								Edit condition
							</Link>
						</li>
						<li>
							<Link
								to="/"
								className="dropdown-item"
								data-bs-toggle="modal"
								data-bs-target={`#deleteConditionModal${condition.id}`}
							>
								Delete condition
							</Link>
						</li>
					</ul>
				</div>

				{!hasAnsweredYes() && (
					<>
						<small className="text-muted">
							Answered <em>No</em> to all questions
						</small>
					</>
				)}
				{hasAnsweredYes() && (
					<ul className="pt-2">
						{condition.hasConsulatedProvider === 'Yes' && (
							<li>
								<small className="text-muted">
									Hospital/specialist treatment in last 12 months
								</small>
							</li>
						)}
						{condition.hasTreatmentPlanned === 'Yes' && (
							<li>
								<small className="text-muted">
									Treatment, investigations or tests planned or pending
								</small>
							</li>
						)}

						{condition.isTakingMedication === 'Yes' && (
							<li>
								<small className="text-muted">
									Currently taking medication
								</small>
							</li>
						)}
					</ul>
				)}
			</div>
		</>
	);
}

export default ConditionStub;
