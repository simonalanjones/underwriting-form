export default function formattedDateString(dateString) {
	const dateElements = dateString.split('-');
	const dateObject = new Date(
		dateElements[0], // year
		dateElements[1] - 1, // months are zero indexed
		dateElements[2] // day
	);

	const options = {
		//weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	return dateObject.toLocaleDateString('en-GB', options);
}
