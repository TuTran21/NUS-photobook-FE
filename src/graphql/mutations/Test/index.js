/**
 * Create User Mutation
 */

import gql from 'graphql-tag';

const CREATE_TEST = gql`
	mutation createTest($test: CreateTestInput) {
		createTest(test: $test) {
			status
			message
		}
	}
`;

const DELETE_ONE = gql`
	mutation rateTest($id: String) {
		deleteTest(id: $id) {
			status
			message
		}
	}
`;

const DELETE_MANY = gql`
	mutation deleteManyTests($tests: [String]) {
		deleteManyTests(tests: $tests) {
			status
			message
		}
	}
`;

const SUBMIT_READING_ANSWERS = gql`
	mutation submitReadingAnswer($testId: String, $answers: ReadingAnswerInput, $timeSpent: Int) {
		submitReadingAnswer(testId: $testId, answers: $answers, timeSpent: $timeSpent) {
			resultId
		}
	}
`;

const RATE_TEST = gql`
	mutation rateTest($id: String, $star: Float) {
		rateTest(id: $id, star: $star) {
			status
			message
		}
	}
`;

export default { CREATE_TEST, SUBMIT_READING_ANSWERS, RATE_TEST, DELETE_ONE, DELETE_MANY };
