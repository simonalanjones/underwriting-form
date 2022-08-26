import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MemberFields from '../views/forms/memberFields';

const mockSubmit = jest.fn().mockName('testSubmit');
const mockCancel = jest.fn().mockName('testCancel');

let subscriberData = {
	userFirstName: 'John',
	userLastName: 'Doe',
	relation: 'Main subscriber',
	title: 'Mr',
	phoneNumber: '01234 567890',
	dateOfBirth: '1970-05-20',
};

let dependantData = {
	userFirstName: 'John',
	userLastName: 'Doe',
	relation: 'Male dependant',
	title: 'Mr',
	phoneNumber: '01234 567890',
	dateOfBirth: '1970-05-20',
};

// helper functions to retrieve commonly referenced elements

const firstNameField = () => screen.getByLabelText('First name');
const lastNameField = () => screen.getByLabelText('Last name');
const relationField = () => screen.getByRole('combobox', { name: 'Relation' });
const titleField = () => screen.getByRole('combobox', { name: 'Title' });
const dateOfBirthField = () => screen.getByLabelText('Date of Birth');
const telephoneField = () => screen.getByLabelText('Telephone No.');
const submitButton = () => screen.getByRole('button', { name: 'Submit' });
const disclaimerCheckbox = () =>
	screen.getByTestId('disclaimerCheckSubscriber');

const disclaimerCheckbox2 = () =>
	screen.getByTestId('firstDisclaimerCheckboxDependant');
const disclaimerCheckbox3 = () =>
	screen.getByTestId('secondDisclaimerCheckboxDependant');

const validationMessages = {
	firstName: {
		required: 'First name required',
		minChars: 'More than 3 chars required',
	},

	lastName: {
		required: 'Last name required',
	},
	relation: {
		required: 'Relation required',
	},
	title: {
		required: 'Title required',
	},
	dateOfBirth: {
		required: 'Date of birth required',
	},
};

describe('initial render', () => {
	test('renders all form elements', () => {
		render(
			<MemberFields handleSubmit={mockSubmit} handleCancel={mockCancel} />
		);

		expect(firstNameField()).toBeInTheDocument();
		expect(lastNameField()).toBeInTheDocument();
		expect(relationField()).toBeInTheDocument();
		expect(titleField()).toBeInTheDocument();
		expect(dateOfBirthField()).toBeInTheDocument();
		expect(telephoneField()).toBeInTheDocument();
		expect(submitButton()).toBeInTheDocument();
		expect(submitButton()).toBeDisabled();
	});

	test('renders form with test subscriber data', () => {
		render(
			<MemberFields
				handleSubmit={mockSubmit}
				handleCancel={mockCancel}
				data={subscriberData}
			/>
		);

		expect(firstNameField()).toHaveValue(subscriberData.userFirstName);
		expect(lastNameField()).toHaveValue(subscriberData.userLastName);
		expect(relationField()).toHaveValue(subscriberData.relation);
		expect(titleField()).toHaveValue(subscriberData.title);
		expect(telephoneField()).toHaveValue(subscriberData.phoneNumber);
		expect(dateOfBirthField()).toHaveValue(subscriberData.dateOfBirth);
	});
});

describe('renders the correct disclaimers for different relation types', () => {
	test('offers correct disclaimer checkbox when choosing relation: main subscriber', () => {
		render(
			<MemberFields
				handleSubmit={mockSubmit}
				handleCancel={mockCancel}
				data={subscriberData}
			/>
		);

		expect(disclaimerCheckbox()).toBeInTheDocument();
	});

	test('offers correct disclaimer checkboxes when choosing relation: other', () => {
		render(
			<MemberFields
				handleSubmit={mockSubmit}
				handleCancel={mockCancel}
				data={dependantData}
			/>
		);

		expect(disclaimerCheckbox2()).toBeInTheDocument();
		expect(disclaimerCheckbox3()).toBeInTheDocument();
	});
});

describe('interact with form elements', () => {
	test('can type into firstname field', async () => {
		render(
			<MemberFields handleSubmit={mockSubmit} handleCancel={mockCancel} />
		);
		const user = userEvent.setup();

		const firstnameInput = firstNameField();
		await user.type(firstNameField(), subscriberData.userFirstName);
		await waitFor(() =>
			expect(firstnameInput.value).toBe(subscriberData.userFirstName)
		);
	});

	test('can type into lastname field', async () => {
		render(
			<MemberFields handleSubmit={mockSubmit} handleCancel={mockCancel} />
		);
		const user = userEvent.setup();

		const lastnameInput = lastNameField();
		await user.type(lastnameInput, subscriberData.userLastName);
		await waitFor(() =>
			expect(lastnameInput.value).toBe(subscriberData.userLastName)
		);
	});

	test('can select a relation option', async () => {
		render(
			<MemberFields handleSubmit={mockSubmit} handleCancel={mockCancel} />
		);

		const relationSelect = relationField();
		await userEvent.selectOptions(relationSelect, subscriberData.relation);
		expect(relationSelect).toHaveValue(subscriberData.relation);
	});

	test('can select a title option', async () => {
		render(
			<MemberFields handleSubmit={mockSubmit} handleCancel={mockCancel} />
		);

		const titleSelect = titleField();
		await userEvent.selectOptions(titleSelect, subscriberData.title);
		expect(titleSelect).toHaveValue(subscriberData.title);
	});

	test('can change the date of birth', async () => {
		render(
			<MemberFields handleSubmit={mockSubmit} handleCancel={mockCancel} />
		);

		const dobField = dateOfBirthField();
		fireEvent.change(dobField, {
			target: { value: subscriberData.dateOfBirth },
		});

		await waitFor(() =>
			expect(dobField.value).toBe(subscriberData.dateOfBirth)
		);
	});

	test('can type into telephone field', async () => {
		render(
			<MemberFields handleSubmit={mockSubmit} handleCancel={mockCancel} />
		);
		const user = userEvent.setup();

		const telephoneInput = telephoneField();
		await user.type(telephoneInput, subscriberData.phoneNumber);
		await waitFor(() =>
			expect(telephoneInput.value).toBe(subscriberData.phoneNumber)
		);
	});
});

describe('trigger validation messages', () => {
	//it.todo('Should show errors if submit without data');

	test('focus in/out of firstname field shows error', async () => {
		render(
			<MemberFields handleSubmit={mockSubmit} handleCancel={mockCancel} />
		);

		const user = userEvent.setup();
		const firstNameElement = firstNameField();

		// verify the validation message not on screen
		expect(
			screen.queryByText(validationMessages.firstName.required)
		).not.toBeInTheDocument();

		// focus and then defocus the firstname field
		firstNameElement.focus();
		await waitFor(() => expect(firstNameElement).toHaveFocus());
		user.tab();
		await waitFor(() => expect(firstNameElement).not.toHaveFocus());

		// verify the validation message is now on screen
		expect(
			screen.getByText(validationMessages.firstName.required)
		).toBeInTheDocument();
	});

	test('focus in/out of lastname field shows error', async () => {
		render(
			<MemberFields handleSubmit={mockSubmit} handleCancel={mockCancel} />
		);

		const user = userEvent.setup();
		const lastNameElement = lastNameField();

		// verify the validation message not on screen
		expect(
			screen.queryByText(validationMessages.lastName.required)
		).not.toBeInTheDocument();

		// focus and then defocus the firstname field
		lastNameElement.focus();
		await waitFor(() => expect(lastNameElement).toHaveFocus());
		user.tab();
		await waitFor(() => expect(lastNameElement).not.toHaveFocus());

		// verify the validation message is now on screen
		expect(
			screen.getByText(validationMessages.lastName.required)
		).toBeInTheDocument();
	});

	test('focus in/out of relation field shows error', async () => {
		render(
			<MemberFields handleSubmit={mockSubmit} handleCancel={mockCancel} />
		);

		const user = userEvent.setup();
		const relationElement = relationField();

		// verify the validation message not on screen
		expect(
			screen.queryByText(validationMessages.relation.required)
		).not.toBeInTheDocument();

		// focus and then defocus the firstname field
		relationElement.focus();
		await waitFor(() => expect(relationElement).toHaveFocus());
		user.tab();
		await waitFor(() => expect(relationElement).not.toHaveFocus());

		// verify the validation message is now on screen
		expect(
			screen.getByText(validationMessages.relation.required)
		).toBeInTheDocument();
	});

	test('focus in/out of title field shows error', async () => {
		render(
			<MemberFields handleSubmit={mockSubmit} handleCancel={mockCancel} />
		);

		const user = userEvent.setup();
		const titleElement = titleField();

		// verify the validation message not on screen
		expect(
			screen.queryByText(validationMessages.title.required)
		).not.toBeInTheDocument();

		// focus and then defocus the firstname field
		titleElement.focus();
		await waitFor(() => expect(titleElement).toHaveFocus());
		user.tab();
		await waitFor(() => expect(titleElement).not.toHaveFocus());

		// verify the validation message is now on screen
		expect(
			screen.getByText(validationMessages.title.required)
		).toBeInTheDocument();
	});

	test('focus in/out of DOB field shows error', async () => {
		render(
			<MemberFields handleSubmit={mockSubmit} handleCancel={mockCancel} />
		);

		const user = userEvent.setup();
		const dobElement = dateOfBirthField();

		// verify the validation message not on screen
		expect(
			screen.queryByText(validationMessages.dateOfBirth.required)
		).not.toBeInTheDocument();

		// focus and then defocus the firstname field
		dobElement.focus();
		await waitFor(() => expect(dobElement).toHaveFocus());
		user.tab();
		await waitFor(() => expect(dobElement).not.toHaveFocus());

		// verify the validation message is now on screen
		expect(
			screen.getByText(validationMessages.dateOfBirth.required)
		).toBeInTheDocument();
	});
});

describe('submit a test form', () => {
	test('can submit form', async () => {
		render(
			<MemberFields handleSubmit={mockSubmit} handleCancel={mockCancel} />
		);

		const user = userEvent.setup();
		await user.type(firstNameField(), subscriberData.userFirstName);
		await user.type(lastNameField(), subscriberData.userLastName);
		await userEvent.selectOptions(relationField(), subscriberData.relation);
		await userEvent.selectOptions(titleField(), subscriberData.title);

		fireEvent.change(dateOfBirthField(), {
			target: { value: subscriberData.dateOfBirth },
		});

		await user.type(telephoneField(), subscriberData.phoneNumber);

		// submit button should be disabled before selecting checkbox
		const submitButtonElement = submitButton();
		expect(submitButtonElement).toBeDisabled();

		const disclaimerCheckbox = screen.getByTestId('disclaimerCheckSubscriber');
		expect(disclaimerCheckbox).not.toBeChecked();

		fireEvent.click(disclaimerCheckbox);
		await waitFor(() => expect(disclaimerCheckbox).toBeChecked());

		// // submit button should be enabled after selecting checkbox
		expect(submitButtonElement).toBeEnabled();

		await waitFor(() => user.click(submitButtonElement));
		expect(mockSubmit).toHaveBeenCalledWith(subscriberData);
	});
});
