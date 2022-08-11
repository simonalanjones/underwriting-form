import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AgentFields from '../views/forms/agentFields';

const mockSubmit = jest.fn().mockName('testSubmit');
const mockCancel = jest.fn().mockName('testCancel');

const agentData = {
	agentName: 'John Doe',
	agentEmail: 'John@doe.net',
	agentDept: 'Retention',
};

const radioOptions = ['Retention', 'Acquisition'];

test('renders all agent form fields', () => {
	render(<AgentFields />);
	expect(screen.getByLabelText('Agent name')).toBeInTheDocument();
	expect(screen.getByLabelText('Agent email')).toBeInTheDocument();
	expect(screen.getByLabelText('Retention')).toBeInTheDocument();
	expect(screen.getByLabelText('Acquisition')).toBeInTheDocument();
	expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
});

test('renders form and prepopulate fields', () => {
	render(<AgentFields data={agentData} />);

	const agentNameInput = screen.getByLabelText('Agent name');
	expect(agentNameInput).toHaveValue(agentData.agentName);

	const agentEmailInput = screen.getByLabelText('Agent email');
	expect(agentEmailInput).toHaveValue(agentData.agentEmail);

	const agentDeptInput = screen.getByLabelText(agentData.agentDept);
	expect(agentDeptInput).toBeChecked();
});

test('can type into each form field and select each radio option', () => {
	render(<AgentFields />);

	const agentNameInput = screen.getByLabelText('Agent name');
	userEvent.type(agentNameInput, agentData.agentName);
	expect(agentNameInput.value).toBe(agentData.agentName);

	const agentEmailInput = screen.getByLabelText('Agent email');
	userEvent.type(agentEmailInput, agentData.agentEmail);
	expect(agentEmailInput.value).toBe(agentData.agentEmail);

	const radioRetentionInput = screen.getByLabelText(radioOptions[0]);
	userEvent.click(radioRetentionInput);
	expect(radioRetentionInput).toBeChecked();

	const radioAcquisitionInput = screen.getByLabelText(radioOptions[1]);
	userEvent.click(radioAcquisitionInput);
	expect(radioAcquisitionInput).toBeChecked();
});

test('shows errors if submitting incomplete form', () => {
	render(<AgentFields />);

	const agentNameInput = screen.queryByTestId('invalid-feedback-agent-name');
	expect(agentNameInput).not.toBeInTheDocument();

	const agentEmailInput = screen.queryByTestId('invalid-feedback-agent-email');
	expect(agentEmailInput).not.toBeInTheDocument();

	const agentDeptInput = screen.queryByTestId('invalid-feedback-agent-dept');
	expect(agentDeptInput).not.toBeInTheDocument();

	const submitButton = screen.getByRole('button', { name: 'Submit' });
	userEvent.click(submitButton);

	const errorAgentNameId = screen.getByTestId('invalid-feedback-agent-name');
	expect(errorAgentNameId).toBeInTheDocument();

	const errorAgentEmailId = screen.getByTestId('invalid-feedback-agent-email');
	expect(errorAgentEmailId).toBeInTheDocument();

	const errorAgentDeptId = screen.getByTestId('invalid-feedback-agent-dept');
	expect(errorAgentDeptId).toBeInTheDocument();
});

test('can successfully submit form', () => {
	render(<AgentFields data={agentData} handleSubmit={mockSubmit} />);

	const submitButton = screen.getByRole('button', { name: 'Update' });
	userEvent.click(submitButton);
	expect(mockSubmit).toHaveBeenCalledWith(agentData);
});

test('can use form cancel button', () => {
	render(
		<AgentFields
			data={agentData}
			handleSubmit={mockSubmit}
			handleCancel={mockCancel}
		/>
	);

	const cancelButton = screen.getByRole('button', { name: 'Cancel' });
	userEvent.click(cancelButton);
	expect(mockCancel).toHaveBeenCalled();
});
