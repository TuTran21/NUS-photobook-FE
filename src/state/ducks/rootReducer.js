import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from 'utils/history';
import testReducer from './test/';
import authReducer from './auth';
import i18n from 'state/ducks/i18n';

export default function createReducer(injectedReducers = {}) {
	const rootReducer = combineReducers({
		router: connectRouter(history),
		i18n,
		test: testReducer,
		auth: authReducer,
		...injectedReducers,
	});

	return rootReducer;
}
