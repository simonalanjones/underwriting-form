//import getAgent from './agentData';

const getAgent = require('./agentData').getAgent;
const getMembership = require('./membershipData').getMembership;
const getMember = require('./memberData').getMembers;

const axios = require('axios').default;
let status = '';

export function submit(postCallbackSubmitForm) {
	//console.log(postCallbackSubmitForm);
	// console.log('going to submit form...');
	// axios.get(`/photos`).then((res) => {
	// 	const photos = res.data;
	// 	console.log(photos);
	// });

	//console.log(postCallbackSubmitForm);
	axios.defaults.headers.post['Content-Type'] =
		'application/x-www-form-urlencoded';
	axios
		.get('http://react.cond-switch/', {
			agentData: getAgent(),
			membershipData: getMembership(),
			memberData: getMember(),
		})

		.then(function (response) {
			// handle success
			console.log(response);
			status = response.status;
			console.log(status);
			//confirmSuccess();
		})
		.catch(function (error) {
			// handle error
			console.log(error);
			status = error.response.status;
			console.log(status);
		})
		.then(function () {
			// always executed
			//console.log('got to the end');
			//console.log(typeof postCallbackSubmitForm);
			if (typeof (postCallbackSubmitForm === 'function')) {
				postCallbackSubmitForm(status);
			}
		});
}
