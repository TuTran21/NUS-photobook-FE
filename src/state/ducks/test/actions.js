/* ACTION CREATOR FUNCTIONS

Put here the functions that return an action object that can be dispatched
HINT: Always use functions for consistency, don't export plain objects

*/

import types from './types';

const addTest = test => {
	return {
		type: types.ADD_TEST,
		payload: test,
	};
};

const removeTest = () => {
	return {
		type: types.REMOVE_TEST,
	};
};

const updateReadingAnswers = answers => {
	return {
		type: types.UPDATE_READING_ANSWER,
		payload: answers,
	};
};

const removeAnswerSheet = () => {
	return {
		type: types.REMOVE_ANSWER_SHEET,
	};
};

export default {
	addTest,
	removeTest,
	updateReadingAnswers,
	removeAnswerSheet,
};
