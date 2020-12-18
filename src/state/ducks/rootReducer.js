import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from 'utils/history';
import authReducer from './auth';
import i18n from 'state/ducks/i18n';

export default function createReducer(injectedReducers = {}) {
	const rootReducer = combineReducers({
		router: connectRouter(history),
		i18n,
		auth: authReducer,
		...injectedReducers,
	});

	return rootReducer;
}
