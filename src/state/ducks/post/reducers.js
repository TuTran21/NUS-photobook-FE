/* REDUCER(S)

It's a good practice to define your state shape first.
Based on the state shape, multiple reducers might be defined in this file, combined and exported into a single reducer function.

*/
// import { combineReducers } from 'redux';
// const quackReducer = (state = false, action) => {
// 	switch (action.type) {
// 		case types.QUACK:
// 			return true;
// 		/* ... */
// 		default:
// 			return state;
// 	}
// };

// const distanceReducer = (state = 0, action) => {
// 	switch (action.type) {
// 		case types.SWIM:
// 			return state + action.payload.distance;
// 		/* ... */
// 		default:
// 			return state;
// 	}
// };

// export default combineReducers({
// 	quacking: quackReducer,
// 	distance: distanceReducer,
// });
import types from './types';

/* State Shape
{
   postList: [
	   {
		   userId: number,
		   id: number,
		   title: string,
		   body: string
	   }
   ]
}
*/

const initialState = {
	photoList: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.LOAD_PHOTO_LIST:
			return {
				...state,
				photoList: action.photoList,
			};
		default:
			return state;
	}
};

export default reducer;
