import React, { useState, useEffect, useRef } from 'react';
import RadioOptions from '../../../common/radioOptions';

function ConditionFields(props) {
	const formRef = useRef();
	const conditionInput = useRef();

	const handleCancel = props.handleCancel;
	const handleSubmit = props.handleSubmit;

	const [fields, setFields] = useState({
		condition: '',
		hasConsulatedProvider: '',
		consultingProviderDetails: '',
		hasTreatmentPlanned: '',
		treatmentPlannedDetails: '',
		isTakingMedication: '',
		medications: '',
		notes: '',
	});

	// give the medical condition field focus only new new entry
	useEffect(() => {
		if (!props.data) {
			conditionInput.current.focus();
		}
	}, [props]);

	useEffect(() => {
		if (props.data) {
			setFields({
				condition: props.data.condition,
				hasConsulatedProvider: props.data.hasConsulatedProvider,
				consultingProviderDetails: props.data.consultingProviderDetails,
				hasTreatmentPlanned: props.data.hasTreatmentPlanned,
				treatmentPlannedDetails: props.data.treatmentPlannedDetails,
				isTakingMedication: props.data.isTakingMedication,
				medications: props.data.medications,
				notes: props.data.notes,
			});
		}
	}, [props.data]);

	const handleChange = (e) => {
		setFields({
			...fields,
			[e.target.name]: e.target.value,
		});
	};

	function submitHandler(event) {
		event.preventDefault();
		event.stopPropagation();
		formRef.current.classList.add('was-validated');
		if (formRef.current.checkValidity()) {
			/* callback passed through parent component props */
			handleSubmit(fields);
		}
	}

	return (
		<form
			onSubmit={submitHandler}
			ref={formRef}
			className="needs-validation p-4 p-md-5 border rounded-3 bg-white shadow-sm"
			noValidate
		>
			<div className="container">
				<div className="mb-4">
					<label htmlFor="condition" className="form-label">
						Medical condition
					</label>

					<input
						ref={conditionInput}
						maxLength="70"
						type="input"
						name="condition"
						className="form-control"
						id="condition"
						value={fields.condition}
						onChange={handleChange}
						required
					/>
					<div className="invalid-feedback">Required field</div>
				</div>
				<div className="mb-4">
					<p className="form-label">
						Seen a specialist or received treatment in a hospital within last 12
						months?
					</p>
					<div className="form-group">
						<RadioOptions
							name="hasConsulatedProvider"
							changeHandler={handleChange}
							value={fields.hasConsulatedProvider}
							options={['Yes', 'No']}
							checkedItem={fields.hasConsulatedProvider}
							required={true}
						/>
					</div>
					{fields.hasConsulatedProvider === 'Yes' && (
						<div className="mb-4 mt-3">
							<label htmlFor="consultingProviderDetails" className="form-label">
								Details
							</label>

							<textarea
								name="consultingProviderDetails"
								className="form-control"
								id="consultingProviderDetails"
								value={fields.consultingProviderDetails}
								onChange={handleChange}
								required={fields.hasConsulatedProvider}
							/>
						</div>
					)}
				</div>
				<div className="mb-4">
					<p className="form-label">
						Any treatment, investigations or tests planned or pending?
					</p>
					<RadioOptions
						name="hasTreatmentPlanned"
						changeHandler={handleChange}
						value={fields.hasTreatmentPlanned}
						options={['Yes', 'No']}
						checkedItem={fields.hasTreatmentPlanned}
						required={true}
					/>
					{fields.hasTreatmentPlanned === 'Yes' && (
						<div className="mb-4 mt-3">
							<label
								htmlFor="treatmentPlannedDetails"
								className="input-group form-label"
							>
								Details
							</label>

							<textarea
								name="treatmentPlannedDetails"
								className="form-control"
								id="treatmentPlannedDetails"
								value={fields.treatmentPlannedDetails}
								onChange={handleChange}
								required={fields.hasTreatmentPlanned}
							/>
						</div>
					)}
				</div>
				<p className="form-label">Currently taking any medication?</p>
				<RadioOptions
					name="isTakingMedication"
					changeHandler={handleChange}
					value={fields.isTakingMedication}
					options={['Yes', 'No']}
					checkedItem={fields.isTakingMedication}
					required={true}
				/>
				{fields.isTakingMedication === 'Yes' && (
					<div className="mb-3 mt-3">
						<label htmlFor="medications" className="input-group form-label">
							Details
						</label>

						<textarea
							name="medications"
							className="form-control"
							id="medications"
							value={fields.medications}
							onChange={handleChange}
							required={fields.isTakingMedication}
						/>
					</div>
				)}
				<div className="pt-4 pb-4">
					<label htmlFor="additionalInfo" className="input-group form-label">
						Notes
					</label>
					<textarea
						name="notes"
						className="form-control"
						id="additionalInfo"
						value={fields.notes}
						onChange={handleChange}
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					{!props.data ? 'Submit' : 'Update'}
				</button>
				&nbsp;
				<button onClick={() => handleCancel()} className="btn btn-secondary">
					Cancel
				</button>
			</div>
		</form>
	);
}

export default ConditionFields;
