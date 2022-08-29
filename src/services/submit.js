//const getAgent = require('./agentData').getAgent;
//const getMembership = require('./membershipData').getMembership;
//const getMember = require('./memberData').getMembers;

//const axios = require('axios').default;
//let status = '';
//const endPoint = 'localhost:3000';

export function submit(postCallbackSubmitForm) {
	// axios.defaults.headers.post['Content-Type'] =
	// 	'application/x-www-form-urlencoded';
	// axios
	// 	.get(endPoint, {
	// 		agentData: getAgent(),
	// 		membershipData: getMembership(),
	// 		memberData: getMember(),
	// 	})

	// 	.then(function (response) {
	// 		// handle success
	// 		status = response.status;
	// 		//console.log(status);
	// 		//confirmSuccess();
	// 	})
	// 	.catch(function (error) {
	// 		// handle error
	// 		//console.log(error);
	// 		status = error.response.status;
	// 		//console.log(status);
	// 	})
	// 	.then(function () {
	// 		// always executed
	// 		if (typeof (postCallbackSubmitForm === 'function')) {
	// 			postCallbackSubmitForm(status);
	// 		}
	// 	});
	postCallbackSubmitForm(200);
}
