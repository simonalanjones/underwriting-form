import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConditionFields from '../views/forms/conditionFields';

const mockSubmit = jest.fn().mockName('testSubmit');
const mockCancel = jest.fn().mockName('testCancel');

const testData = {
	condition: 'Back Pain',
	consultingProviderDetails: '',
	hasConsulatedProvider: 'No',
	hasTreatmentPlanned: 'No',
	isTakingMedication: 'Yes',
	medications: 'Neurofen',
	treatmentPlannedDetails: '',
	notes: '6 months history',
};

const validationMessages = {
	condition: {
		required: 'Condition required',
	},
	provider: {
		required: 'Selection required',
	},
	treatment: {
		required: 'Selection required',
	},
	medication: {
		required: 'Selection required',
	},
};

// helper functions to retrieve commonly referenced elements

const conditionLabel = () => screen.getByText('Medical condition');
const providerLabel = () =>
	screen.getByText(
		'Seen a specialist or received treatment in a hospital within last 12 months?'
	);
const treatmentLabel = () =>
	screen.getByText(
		'Any treatment, investigations or tests planned or pending?'
	);
const medicationLabel = () =>
	screen.getByText('Currently taking any medication?');

const conditionField = () => screen.getByLabelText('Medical condition');
const providerYesField = () => screen.getByTestId('hasConsulatedProviderYes');
const providerNoField = () => screen.getByTestId('hasConsulatedProviderNo');
const providerNotesField = () => screen.getByLabelText('Visiting details');
const treatmentYesField = () => screen.getByTestId('hasTreatmentPlannedYes');
const treatmentNoField = () => screen.getByTestId('hasTreatmentPlannedNo');
const treatmentNotesField = () => screen.getByLabelText('Treatment details');
const medicationYesField = () => screen.getByTestId('isTakingMedicationYes');
const medicationNoField = () => screen.getByTestId('isTakingMedicationNo');
const medicationNotesField = () => screen.getByLabelText('Medication details');
const notesField = () => screen.getByLabelText('Notes');
const submitButton = () => screen.getByRole('button', { name: 'Submit' });

describe('initial render', () => {
	//
	test('renders all form elements', async () => {
		render(
			<ConditionFields handleSubmit={mockSubmit} handleCancel={mockCancel} />
		);

		expect(conditionLabel()).toBeInTheDocument();
		expect(conditionField()).toBeInTheDocument();

		expect(providerLabel()).toBeInTheDocument();
		expect(providerNoField()).toBeInTheDocument();
		expect(providerYesField()).toBeInTheDocument();

		expect(treatmentLabel()).toBeInTheDocument();
		expect(treatmentYesField()).toBeInTheDocument();
		expect(treatmentNoField()).toBeInTheDocument();

		expect(medicationLabel()).toBeInTheDocument();
		expect(medicationYesField()).toBeInTheDocument();
		expect(medicationNoField()).toBeInTheDocument();

		expect(notesField()).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
	});

	test('renders form with test data', () => {
		render(
			<ConditionFields
				handleSubmit={mockSubmit}
				handleCancel={mockCancel}
				data={testData}
			/>
		);

		expect(conditionField()).toHaveValue(testData.condition);
		expect(providerYesField()).not.toBeChecked();
		expect(providerNoField()).toBeChecked();

		expect(treatmentYesField()).not.toBeChecked();
		expect(treatmentNoField()).toBeChecked();

		expect(medicationYesField()).toBeChecked();
		expect(medicationNoField()).not.toBeChecked();

		expect(medicationNotesField()).toHaveValue(testData.medications);
		expect(notesField()).toHaveValue(testData.notes);
	});
});

describe('interact with form elements', () => {
	test('can type into condition field', async () => {
		const user = userEvent.setup();
		render(
			<ConditionFields handleSubmit={mockSubmit} handleCancel={mockCancel} />
		);

		const conditionInput = conditionField();
		await user.type(conditionInput, testData.condition);
		await waitFor(() => expect(conditionInput.value).toBe(testData.condition));
	});

	test('can select each of the radio buttons', async () => {
		const user = userEvent.setup();
		render(
			<ConditionFields handleSubmit={mockSubmit} handleCancel={mockCancel} />
		);

		await user.click(providerYesField());
		await waitFor(() => expect(providerYesField()).toBeChecked());
		await user.click(providerNoField());
		await waitFor(() => expect(providerNoField()).toBeChecked());

		await user.click(treatmentYesField());
		await waitFor(() => expect(treatmentYesField()).toBeChecked());
		await user.click(treatmentNoField());
		await waitFor(() => expect(treatmentNoField()).toBeChecked());

		await user.click(medicationYesField());
		await waitFor(() => expect(medicationYesField()).toBeChecked());
		await user.click(medicationNoField());
		await waitFor(() => expect(medicationNoField()).toBeChecked());
	});
});

describe('submitting the form', () => {
	test('shows validation messages when no data is submitted', async () => {
		const user = userEvent.setup();
		render(
			<ConditionFields handleSubmit={mockSubmit} handleCancel={mockCancel} />
		);

		await waitFor(() => user.click(submitButton()));

		await waitFor(() => {
			expect(
				screen.getByText(validationMessages.condition.required)
			).toBeInTheDocument();
		});

		await waitFor(() => {
			expect(
				screen.getByText(validationMessages.provider.required)
			).toBeInTheDocument();
		});

		await waitFor(() => {
			expect(
				screen.getByText(validationMessages.treatment.required)
			).toBeInTheDocument();
		});

		await waitFor(() => {
			expect(
				screen.getByText(validationMessages.medication.required)
			).toBeInTheDocument();
		});
	});

	test('cannot submit form without completing minimum required fields', async () => {
		render(
			<ConditionFields handleSubmit={mockSubmit} handleCancel={mockCancel} />
		);
		const user = userEvent.setup();
		await waitFor(() => user.click(submitButton()));
		expect(mockSubmit).not.toHaveBeenCalled();
	});

	test('can submit form with required fields completed', async () => {
		render(
			<ConditionFields
				handleSubmit={mockSubmit}
				handleCancel={mockCancel}
				data={testData}
			/>
		);
		const user = userEvent.setup();
		await waitFor(() => user.click(submitButton()));
		expect(mockSubmit).toHaveBeenCalledWith(testData);
	});
});
