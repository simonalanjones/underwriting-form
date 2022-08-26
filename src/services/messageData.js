function getData() {
	return JSON.parse(sessionStorage.getItem('messageData'));
}

function setData(members) {
	sessionStorage.setItem('agentData', JSON.stringify(members));
}

export function messageCount() {
	if (getData() !== undefined && getData() !== null) {
		return getData().length;
	}
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
