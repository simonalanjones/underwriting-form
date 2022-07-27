//import getAgent from './agentData';
const getAgent = require('./agentData').getAgent;
const getMembership = require('./membershipData').getMembership;
const getMember = require('./memberData').getMembers;

const axios = require('axios').default;

export function submit() {
	// console.log('going to submit form...');
	// axios.get(`/photos`).then((res) => {
	// 	const photos = res.data;
	// 	console.log(photos);
	// });

	console.log(getAgent());
	axios.defaults.headers.post['Content-Type'] =
		'application/x-www-form-urlencoded';
	axios
		.get('/users', {
			agentData: getAgent(),
			membershipData: getMembership(),
			memberData: getMember(),
		})

		.then(function (response) {
			// handle success
			console.log(response);
			//confirmSuccess();
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
