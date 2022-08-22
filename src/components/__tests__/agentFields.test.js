import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AgentFields from '../views/forms/agentFields';

const mockSubmit = jest.fn().mockName('testSubmit');
const mockCancel = jest.fn().mockName('testCancel');

const testData = {
	agentName: 'John Doe',
	agentEmail: 'John@doe.net',
	agentDept: 'Retention',
};

const radioOptions = ['Retention', 'Acquisition'];

const validationMessages = {
	agentName: {
		required: 'Agent Name required',
	},
	agentEmail: {
		required: 'Agent Email required',
		invalid: 'Invalid email address',
	},
	agentDept: {
		required: 'Agent Dept required',
	},
};

// helper functions to retrieve commonly referenced elements

const agentNameField = () => screen.getByLabelText('Agent name');
const agentEmailField = () => screen.getByLabelText('Agent email');
const retentionField = () => screen.getByLabelText('Retention');
const acquisitionField = () => screen.getByLabelText('Acquisition');
//const agentDeptInput = () => screen.getByLabelText(testData.agentDept);
const submitButton = () => screen.getByRole('button', { name: 'Submit' });

// tests begin

test('renders all agent form fields', () => {
	render(<AgentFields />);

	expect(agentNameField()).toBeInTheDocument();
	expect(agentEmailField()).toBeInTheDocument();
	expect(retentionField()).toBeInTheDocument();
	expect(acquisitionField()).toBeInTheDocument();
	expect(submitButton()).toBeInTheDocument();
});

test('renders form and prepopulate fields', () => {
	render(<AgentFields data={testData} />);

	const agentDeptInput = screen.getByLabelText(testData.agentDept);
	expect(agentNameField()).toHaveValue(testData.agentName);
	expect(agentEmailField()).toHaveValue(testData.agentEmail);
	expect(agentDeptInput).toBeChecked();
});

test('can type into each form field and select each radio option', async () => {
	render(<AgentFields />);
	const user = userEvent.setup();

	const agentNameInput = screen.getByLabelText('Agent name');
	const agentEmailInput = screen.getByLabelText('Agent email');

	await user.type(agentNameInput, testData.agentName);
	await waitFor(() => expect(agentNameInput.value).toBe(testData.agentName));

	await user.type(agentEmailInput, testData.agentEmail);
	await waitFor(() => expect(agentEmailInput.value).toBe(testData.agentEmail));

	for (let i = 0; i < radioOptions.length; i++) {
		const switchFromInput = screen.getByLabelText(radioOptions[i]);
		await user.click(switchFromInput);
		await waitFor(() => expect(switchFromInput).toBeChecked());
	}
});

test('shows errors if entering invalid email address', async () => {
	render(<AgentFields />);
	const user = userEvent.setup();
	// type an invalid email address
	await user.type(agentEmailField(), 'invalid@EmailAddress');
	// select another element in the form (cause onBlur event on email)
	await user.click(agentNameField());
	// verify email error message appears
	expect(
		screen.getByText(validationMessages.agentEmail.invalid)
	).toBeInTheDocument();
});

test('shows errors if submitting incomplete form', async () => {
	render(<AgentFields />);
	const user = userEvent.setup();

	// verify error messages not present on intial render
	expect(
		screen.queryByText(validationMessages.agentName.required)
	).not.toBeInTheDocument();

	expect(
		screen.queryByText(validationMessages.agentEmail.required)
	).not.toBeInTheDocument();

	expect(
		screen.queryByText(validationMessages.agentDept.required)
	).not.toBeInTheDocument();

	// submit form without completing any fields
	const submitButton = screen.getByRole('button', { name: 'Submit' });
	await waitFor(() => user.click(submitButton));

	// verify error messages are now present
	const agentNameErrorText = await screen.findByText(
		validationMessages.agentName.required
	);
	expect(agentNameErrorText).toBeInTheDocument();

	const agentEmailErrorText = await screen.findByText(
		validationMessages.agentEmail.required
	);
	expect(agentEmailErrorText).toBeInTheDocument();

	const agentDeptErrorText = await screen.findByText(
		validationMessages.agentDept.required
	);
	expect(agentDeptErrorText).toBeInTheDocument();
});

test('can successfully submit form', async () => {
	render(<AgentFields data={testData} handleSubmit={mockSubmit} />);
	const user = userEvent.setup();

	const submitButton = screen.getByRole('button', { name: 'Submit' });
	await user.click(submitButton);

	expect(mockSubmit).toHaveBeenCalledWith(testData);
});

test('can use form cancel button', async () => {
	render(
		<AgentFields
			data={testData}
			handleSubmit={mockSubmit}
			handleCancel={mockCancel}
		/>
	);
	const user = userEvent.setup();

	const cancelButton = screen.getByRole('button', { name: 'Cancel' });
	await user.click(cancelButton);
	expect(mockCancel).toHaveBeenCalled();
});
