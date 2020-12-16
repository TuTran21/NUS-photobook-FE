import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const actionTypes = {
	SetLanguage: 'i18n/SET_LANGUAGE',
};

const initialState = {
	lang: {
		lang: 'en',
		name: 'English',
		flag:
			'https://res.cloudinary.com/doyyjeich/image/upload/v1598253999/onlineExam/assets/flags/226-united-states_lg4ygv.svg',
	},
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SetLanguage:
			return { ...state, lang: action.payload };

		default:
			return state;
	}
};

export const actions = {
	setLanguage: lang => ({ type: actionTypes.SetLanguage, payload: lang }),
};

export default reducer;
