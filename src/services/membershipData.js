function getData() {
	return JSON.parse(localStorage.getItem('membershipData'));
}

function setData(members) {
	localStorage.setItem('membershipData', JSON.stringify(members));
}

export function hasMembership() {
	return Object.keys(getData()).length > 0;
}

export function getMembership() {
	return getData();
}

export function setMembership(data) {
	setData(data);
}

export function clearMembership() {
	setData([]);
}
