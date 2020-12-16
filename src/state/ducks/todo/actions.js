/* ACTION CREATOR FUNCTIONS

Put here the functions that return an action object that can be dispatched
HINT: Always use functions for consistency, don't export plain objects

*/

import types from './types';

const addToDo = title => {
	return {
		type: types.ADD_TODO,
		toDoItem: {
			_id: new Date().getTime().toString(),
			title,
		},
	};
};

const loadToDoList = () => {
	return {
		type: types.LOAD_TODO_LIST,
	};
};

export default {
	addToDo,
	loadToDoList,
};
