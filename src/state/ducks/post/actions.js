/* ACTION CREATOR FUNCTIONS

Put here the functions that return an action object that can be dispatched
HINT: Always use functions for consistency, don't export plain objects

*/

import types from './types';

const loadPostList = () => {
	return {
		type: types.LOAD_POST_LIST,
	};
};

export default {
	loadPostList,
};
