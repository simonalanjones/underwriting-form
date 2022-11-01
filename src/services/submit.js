const getAgent = require('./agentData').getAgent;
const getMembership = require('./membershipData').getMembership;
const getMember = require('./memberData').getMembers;

const axios = require('axios').default;
let status = '';
//const endPoint = 'http://uw-form-router.test/index.php';

const currentURL = window.location.origin; // returns the absolute URL of a page
const endPoint = currentURL + '/intranet/uw-form-email/data/index.php';

export function submit(postCallbackSubmitForm) {
	console.log(currentURL);
	console.log(endPoint);

	axios.defaults.headers.post['Content-Type'] =
		'application/x-www-form-urlencoded';
	axios
		.post(endPoint, {
			agentData: getAgent(),
			membershipData: getMembership(),
			memberData: getMember(),
		})

		.then(function (response) {
			// handle success
			console.log(response);
			status = response.status;
			//console.log(status);
			//confirmSuccess();
		})
		.catch(function (error) {
			// handle error
			//console.log(error);
			status = error.response.status;
			//console.log(status);
		})
		.then(function () {
			// always executed
			if (typeof (postCallbackSubmitForm === 'function')) {
				postCallbackSubmitForm(status);
			}
		});
	postCallbackSubmitForm(200);
}
