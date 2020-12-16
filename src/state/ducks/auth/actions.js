/* ACTION CREATOR FUNCTIONS

Put here the functions that return an action object that can be dispatched
HINT: Always use functions for consistency, don't export plain objects

*/

import constants from './types';
import { signOut } from 'utils/authentication';

function login(email, password) {
	return {
		type: constants.LOGIN,
		payload: { email, password },
	};
}

function loginSuccess(payload) {
	return {
		type: constants.LOG_IN_SUCCESS,
		payload,
	};
}

function loginFailed(error) {
	return {
		type: constants.LOGIN_FAILED,
		error,
	};
}

const logout = () => {
	signOut();
	return {
		type: constants.LOG_OUT,
	};
};

export default {
	login,
	loginSuccess,
	loginFailed,
	logout,
};
