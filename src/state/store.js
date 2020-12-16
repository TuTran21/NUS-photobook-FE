import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from './middlewares';

import { persistReducer, persistStore } from 'redux-persist';
import { persistConfig } from './persistConfig';
import createReducer from 'state/ducks/rootReducer';

/**
 * Root Saga & Root Reducer
 */
import rootReducer from './ducks/rootReducer';
// import rootSaga from './ducks/rootSaga';

const configureStore = (initialState, history) => {
	/**
	 * Middlewares
	 */
	const composeEnhancers = composeWithDevTools({});
	const middlewares = [createLogger(true), routerMiddleware(history)];
	// Persist reducers
	const persistedReducer = persistReducer(persistConfig, createReducer());
	// enable redux devtools... can this be done with Webpack instead?
	const enhancers = composeEnhancers(applyMiddleware(...middlewares));
	const store = createStore(persistedReducer, initialState, enhancers);
	// Running saga middleware
	// sagaMiddleware.run(rootSaga);
	// store.runSaga = sagaMiddleware.run;
	store.injectedReducers = {}; // Reducer registry
	store.injectedSagas = {}; // Saga registry
	// Make reducers hot reloadable, see http://mxs.is/googmo
	/* istanbul ignore next */
	if (module.hot) {
		module.hot.accept('state/ducks/rootReducer', () => {
			store.replaceReducer(createReducer(store.injectedReducers));
		});
	}
	return store;
};

export default configureStore;
