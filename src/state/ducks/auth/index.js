import constants from './types';
import produce from 'immer';

const authState = {
	accessToken: '',
	refreshToken: '',
	authenticated: false,
	activeUser: {},
};

const authReducer = (state = authState, action) =>
	produce(state, newState => {
		switch (action.type) {
			case constants.LOG_IN:
				break;
			case constants.LOG_IN_SUCCESS:
				newState.accessToken = action.payload.accessToken;
				newState.activeUser = {
					username: action.payload.activeUser.username,
					firstName: action.payload.activeUser.firstName,
					avatar: action.payload.activeUser.avatar,
					lastName: action.payload.activeUser.lastName,
				};
				newState.authenticated = true;
				break;
			case constants.LOG_OUT:
				newState.accessToken = '';
				newState.activeUser = {};
				newState.authenticated = false;
				break;

			default:
				return state;
		}
	});

export default authReducer;
