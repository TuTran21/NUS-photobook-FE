import { createSelector } from 'reselect';
import initialState from './';

const selectTestDomain = state => state.test || initialState;

const makeSelectActiveTest = () => createSelector(selectTestDomain, subState => subState.activeTest);

const makeSelectActiveTestDetails = () => createSelector(selectTestDomain, subState => subState.activeTest.testDetails);

const makeSelectReadingAnswers = () => createSelector(selectTestDomain, subState => subState.testAnswers.readingTest);

export default {
	makeSelectActiveTestDetails,
	makeSelectActiveTest,
	makeSelectReadingAnswers,
	selectTestDomain,
};
