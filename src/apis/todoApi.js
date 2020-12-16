import axios from 'axios';

const fetchToDoList = async url => {
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

export default {
	fetchToDoList,
};
