function getData() {
	const data = JSON.parse(localStorage.getItem('agentData'));
	return data !== null && data !== undefined ? data : [];
}

function setData(members) {
	localStorage.setItem('agentData', JSON.stringify(members));
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
