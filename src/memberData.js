import useLocalStorage from './useLocalStorage';
import { useEffect } from 'react';

//let data = []

//const [data] = useLocalStorage('memberData', []);
//const [data] = useLocalStorage('memberData', []);

const useMemberData = (key, defaultValue) => {
	//function useMemberData () {
	const data = useLocalStorage('memberData', []);

	useEffect(() => {
		console.log('local storage accessed', data);
	}, [data]);

	function getMemberData(key) {
		return data[key];
	}
};

export default useMemberData;
