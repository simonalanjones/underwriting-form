// pure js - just the necessary functions to maintain local storage
function getData() {
	const data = JSON.parse(sessionStorage.getItem('memberData'));
	return data !== null && data !== undefined ? data : [];
}

function setData(members) {
	sessionStorage.setItem('memberData', JSON.stringify(members));
}

export function getMembers() {
	return getData();
}

export function memberCount() {
	return getData().length;
}

export function getMember(id) {
	if (memberCount() > 0) {
		return getData().filter((member) => member.id === id)[0];
	}
}

export function addMember(data) {
	const members = [...getMembers(), data];
	setData(members);
}

export function updateMember(data) {
	const members = getData().map((member) =>
		member.id !== data.id ? member : data
	);
	setData(members);
}

export function deleteMember(id) {
	const members = getData().filter((member) => member.id !== id);
	console.log(members);
	setData(members);
}

export function clearMembers() {
	setData([]);
}
