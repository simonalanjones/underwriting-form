import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AgentFields from '../views/forms/agentFields';

const testSubmit = () => {
	return 'submit pressed';
};

test('renders the agent inputs', () => {
	render(<AgentFields />);
	// screen.debug();
	expect(screen.getByLabelText('Agent name')).toBeInTheDocument();
	expect(screen.getByLabelText('Agent email')).toBeInTheDocument();
	expect(screen.getByLabelText('Retention')).toBeInTheDocument();
	expect(screen.getByLabelText('Acquisition')).toBeInTheDocument();
	expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
});

test('can type in form fields and select radio options', () => {
	render(<AgentFields />);
	const agentNameInput = screen.getByLabelText('Agent name');
	userEvent.type(agentNameInput, 'Simon A Jones');
	expect(agentNameInput.value).toBe('Simon A Jones');

	const agentEmailInput = screen.getByLabelText('Agent email');
	userEvent.type(agentEmailInput, 'simonajones@gmail.com');
	expect(agentEmailInput.value).toBe('simonajones@gmail.com');

	const radioRetentionInput = screen.getByLabelText('Retention');
	userEvent.click(radioRetentionInput);
	expect(radioRetentionInput).toBeChecked();

	const radioAcquisitionInput = screen.getByLabelText('Acquisition');
	userEvent.click(radioAcquisitionInput);
	expect(radioAcquisitionInput).toBeChecked();
});

test('will show errors if submitting incomplete form', () => {
	render(<AgentFields />);
	screen.debug();

	let feedback = screen.getByTestId('invalid-feedback-agent-name');
	expect(feedback).not.toBeVisible();
	// console.log(window.getComputedStyle(feedback).getPropertyValue('display'));
	// //expect(feedback).toHaveStyle({ display: 'none' });

	// //console.log(feedback);
	// const submitButton = screen.getByRole('button', { name: 'Submit' });

	// userEvent.click(submitButton);
	// let feedback2 = screen.getByTestId('invalid-feedback-agent-name');
	// console.log(window.getComputedStyle(feedback2).getPropertyValue('display'));

	// let feedback2 = screen.getByTestId('invalid-feedback-agent-name');

	// expect(feedback2).toHaveStyle({ display: 'block' });
	//screen.debug();
});
