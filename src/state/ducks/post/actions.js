/* ACTION CREATOR FUNCTIONS

Put here the functions that return an action object that can be dispatched
HINT: Always use functions for consistency, don't export plain objects

*/

import types from './types';

const loadPhotoList = () => {
	return {
		type: types.LOAD_PHOTO_LIST,
	};
};

export default {
	loadPhotoList,
};
