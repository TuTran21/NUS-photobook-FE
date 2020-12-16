import { call, put, takeEvery } from 'redux-saga/effects';
// import * as postActions from './actions';
import types from './types';
// TODO: Replace with postApi
import todoApi from '../../../apis/todoApi';

// Worker Saga: Perform async task
function* fetchPostList() {
	const endpoint = 'https://jsonplaceholder.typicode.com/posts';
	const data = yield call(todoApi.fetchToDoList, endpoint);
	// put: an effect, pauses the saga until effect is fulfilled.
	yield put({ type: types.RENDER_POST_LIST, postList: data });
}

// Watcher Saga: Watches for specific action, and then executes the related saga
function* loadPostList() {
	yield takeEvery(types.LOAD_POST_LIST, fetchPostList);
}

// Export only watcher sagas
export const sagas = [loadPostList];
