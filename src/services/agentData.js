function getData() {
	return JSON.parse(localStorage.getItem('agentData'));
}

function setData(members) {
	localStorage.setItem('agentData', JSON.stringify(members));
}

export function hasAgent() {
	return Object.keys(getAgent()).length > 0;
}

export function getAgent() {
	return getData();
}

export function setAgent(data) {
	setData(data);
}

export function clearAgent() {
	setData([]);
}
