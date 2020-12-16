import { call, put, takeEvery } from 'redux-saga/effects';
// import * as todoActions from './actions';
import types from './types';
import todoApi from '../../../apis/todoApi';

// Worker Saga: Perform async task
function* fetchToDoList() {
	const endpoint =
		'https://gist.githubusercontent.com/brunokrebs/f1cacbacd53be83940e1e85860b6c65b/raw/to-do-items.json';
	const data = yield call(todoApi.fetchToDoList, endpoint);
	// put: an effect, pauses the saga until effect is fulfilled.
	yield put({ type: types.RENDER_TODO_LIST, toDoList: data });
}

// Watcher Saga: Watches for specific action, and then executes the related saga
function* loadToDoList() {
	yield takeEvery(types.LOAD_TODO_LIST, fetchToDoList);
}

// Export only watcher sagas
export const sagas = [loadToDoList];
