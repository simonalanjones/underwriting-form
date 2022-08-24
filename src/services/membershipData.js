function getData() {
	const data = JSON.parse(sessionStorage.getItem('membershipData'));
	return data !== null && data !== undefined ? data : [];
}

function setData(members) {
	sessionStorage.setItem('membershipData', JSON.stringify(members));
}

export function hasMembership() {
	if (getData() !== undefined && getData() !== null) {
		return Object.keys(getData()).length > 0;
	}
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
