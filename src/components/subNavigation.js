import Modal from '../components/modal.js';
import Alert from '../components/alert.js';
import useLocalStorage from '../useLocalStorage';
import { useState } from 'react';
//import * as bootstrap from 'bootstrap';

export default function SubNavigation() {
	const [agentData] = useLocalStorage('agentData', []);
	const [membershipData] = useLocalStorage('membershipData', []);
	const [memberData] = useLocalStorage('memberData', []);
	const [submitSuccess, setSubmitSuccess] = useState(null);
	const axios = require('axios').default;

	function confirmSuccess() {
		setSubmitSuccess(true);
	}

	function confirmAbandon() {
		console.log('going to abandon form...');
		setSubmitSuccess(false);
	}

	function confirmSubmit() {
		console.log('going to submit form...');
		axios.defaults.headers.post['Content-Type'] =
			'application/x-www-form-urlencoded';
		axios
			.post('http://localhost:80/cond-switch/', {
				agentData: agentData,
				membershipData: membershipData,
				memberData: memberData,
			})

			.then(function (response) {
				// handle success
				console.log(response);
				confirmSuccess();
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			})
			.then(function () {
				// always executed
				console.log('got to the end');
			});
	}

	return (
		<>
			{submitSuccess === true && (
				<Alert
					heading="Success"
					message="You successfully submitted the form."
					type="success"
				/>
			)}
			{submitSuccess === false && (
				<Alert
					heading="Submit failure"
					message="It has not been possible to submit this form. Please contact your support team."
					type="danger"
				/>
			)}

			<Modal
				title="Confirm reset"
				body="All data will be removed. Are you sure you want to reset this form?"
				actionCallback={confirmAbandon}
				actionText="Confirm reset"
				id="abandonModal"
			/>

			<Modal
				title="Confirm submit"
				body="Are you sure you want to submit this form?"
				actionCallback={confirmSubmit}
				actionText="Submit"
				id="submitModal"
			/>

			<div className="container">
				<div className="d-grid gap-2 d-md-flex justify-content-md-end">
					{Object.keys(memberData).length > 0 && (
						<button
							className="btn btn-sm btn-primary me-md-2"
							data-bs-toggle="modal"
							data-bs-target="#submitModal"
							type="button"
						>
							Submit form
						</button>
					)}
					<button
						data-bs-toggle="modal"
						data-bs-target="#abandonModal"
						className="btn btn-sm btn-danger"
						type="button"
					>
						Abandon form
					</button>
				</div>
			</div>
		</>
	);
}
