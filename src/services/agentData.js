function getData() {
	const data = JSON.parse(sessionStorage.getItem('agentData'));
	return data !== null && data !== undefined ? data : [];
}

function setData(members) {
	sessionStorage.setItem('agentData', JSON.stringify(members));
}

export function hasAgent() {
	return Object.keys(getData()).length > 0;
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
