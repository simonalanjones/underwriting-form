import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MembershipFields from '../views/forms/membershipFields';

const mockSubmit = jest.fn().mockName('testSubmit');
const mockCancel = jest.fn().mockName('testCancel');

const testData = {
	membershipNumber: '1234567a',
	dateCompleted: '2022-08-11',
	memberSwitchFrom: 'CREST',
};

const dateToday = () => {
	var date = new Date();
	var today = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
		.toISOString()
		.split('T')[0];
	return today;
};

const radioOptions = ['CREST', 'HARPA', 'Competitor Switch'];

describe('initial render', () => {
	//
	test('renders all form elements', async () => {
		render(
			<MembershipFields handleSubmit={mockSubmit} handleCancel={mockCancel} />
		);

		const membershipInput = screen.getByLabelText('Existing Membership No.');
		expect(membershipInput).toBeInTheDocument();

		const dateInput = screen.getByLabelText('Date completed');
		expect(dateInput).toBeInTheDocument();
		await waitFor(() => expect(dateInput).toHaveValue(dateToday()));

		expect(screen.getByText('Member switching from')).toBeInTheDocument();

		for (let i = 0; i < radioOptions.length; i++) {
			expect(screen.getByLabelText(radioOptions[i])).toBeInTheDocument();
		}

		expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
	});

	test('renders form with test data', () => {
		render(
			<MembershipFields
				data={testData}
				handleSubmit={mockSubmit}
				handleCancel={mockCancel}
			/>
		);

		const memberNumberInput = screen.getByLabelText('Existing Membership No.');
		expect(memberNumberInput).toHaveValue(testData.membershipNumber);

		const dateCompletedInput = screen.getByLabelText('Date completed');
		expect(dateCompletedInput).toHaveValue(testData.dateCompleted);

		const switchFromInput = screen.getByLabelText(testData.memberSwitchFrom);
		expect(switchFromInput).toBeChecked();
	});
});

describe('interact with form elements', () => {
	test('can change the date', async () => {
		render(
			<MembershipFields handleSubmit={mockSubmit} handleCancel={mockCancel} />
		);
		const dateInput = screen.getByLabelText('Date completed');

		fireEvent.change(dateInput, {
			target: { value: testData.dateCompleted },
		});

		await waitFor(() => expect(dateInput.value).toBe(testData.dateCompleted));
	});

	test('can select each radio button', async () => {
		render(<MembershipFields />);
		const user = userEvent.setup();
		for (let i = 0; i < radioOptions.length; i++) {
			const switchFromInput = screen.getByLabelText(radioOptions[i]);
			await user.click(switchFromInput);
			await waitFor(() => expect(switchFromInput).toBeChecked());
		}
	});

	test('can type into membership number field', async () => {
		render(<MembershipFields />);
		const user = userEvent.setup();

		const membershipInput = screen.getByLabelText('Existing Membership No.');
		await user.type(membershipInput, testData.membershipNumber);

		await waitFor(() =>
			expect(membershipInput.value).toBe(testData.membershipNumber)
		);
	});
});

describe('Submit and cancel functions', () => {
	test('shows errors if submitting incomplete form', async () => {
		render(<MembershipFields />);
		const user = userEvent.setup();

		// verify there are no error messages present on inital render
		const errorMembership = screen.queryByText('Membership Number required');
		expect(errorMembership).not.toBeInTheDocument();

		const errorDateCompleted = screen.queryByText('Completed Date required');
		expect(errorDateCompleted).not.toBeInTheDocument();

		const errorSwitchFrom = screen.queryByText('Switch from required');
		expect(errorSwitchFrom).not.toBeInTheDocument();

		const submitButton = screen.getByRole('button', { name: 'Submit' });
		await waitFor(() => user.click(submitButton));

		const errorFoundMembership = await screen.findByText(
			'Membership Number required'
		);
		expect(errorFoundMembership).toBeInTheDocument();

		const errorFoundSwitchFrom = await screen.findByText(
			'Switch from required'
		);
		expect(errorFoundSwitchFrom).toBeInTheDocument();
	});

	test('can successfully submit form', async () => {
		render(
			<MembershipFields
				data={testData}
				handleSubmit={mockSubmit}
				handleCancel={mockCancel}
			/>
		);
		const user = userEvent.setup();

		const submitButton = screen.getByRole('button', { name: 'Submit' });
		await waitFor(() => user.click(submitButton));
		expect(mockSubmit).toHaveBeenCalledWith(testData);
	});

	test('can use form cancel button', async () => {
		render(
			<MembershipFields
				data={testData}
				handleSubmit={mockSubmit}
				handleCancel={mockCancel}
			/>
		);
		const user = userEvent.setup();

		const cancelButton = screen.getByRole('button', { name: 'Cancel' });
		await waitFor(() => user.click(cancelButton));
		expect(mockCancel).toHaveBeenCalled();
	});
});
