function getData() {
	return JSON.parse(localStorage.getItem('messageData'));
}

function setData(members) {
	localStorage.setItem('agentData', JSON.stringify(members));
}

export function messageCount() {
	return getData().length;
}

export function getMessages() {
	return getData();
}

export function addMessage(data) {
	const messages = [...getData(), data];
	setData(messages);
}

export function deleteMessage(messageId) {
	const messages = getData.filter((_message) => _message.id !== messageId);
	setData(messages);
}

export function clearMessages() {
	setData([]);
}