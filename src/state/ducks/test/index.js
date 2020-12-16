import constants from './types';
import produce from 'immer';

const defaultTestAnswers = {
	testId: '',
	readingTest: { passages: [] },
};

const testState = {
	activeTest: {},
	testAnswers: {
		testId: '',
		readingTest: { passages: [] },
	},
};

const testReducer = (state = testState, action) =>
	produce(state, newState => {
		switch (action.type) {
			case constants.ADD_TEST:
				newState.activeTest = action.payload;
				break;
			case constants.REMOVE_TEST:
				newState.activeTest = {};
				break;
			case constants.UPDATE_READING_ANSWER:
				newState.testAnswers = {
					testId: action.payload.testId,
					readingTest: action.payload.readingAnswers,
				};
				break;
			case constants.REMOVE_ANSWER_SHEET:
				newState.testAnswers = defaultTestAnswers;
				break;
			default:
				return state;
		}
	});

export default testReducer;
