import gql from 'graphql-tag';

const GET_TESTS = gql`
	query tests($offset: Int, $limit: Int) {
		tests(offset: $offset, limit: $limit) {
			id
			title
			author {
				username
			}
			views
			image
			rating {
				starAmount
				voteAmount
				votes {
					star
				}
			}
			testsTaken
			createdAt
			testDetails {
				readingTest {
					title
					author
				}
			}
		}
	}
`;

const GET_TEST = gql`
	query test($id: String) {
		test(id: $id) {
			id
			title
			author {
				username
			}
			views
			image
			rating {
				starAmount
				voteAmount
				votes {
					star
				}
			}
			testsTaken
			createdAt
			testDetails {
				readingTest {
					title
					author
					testDetails {
						passages {
							title
							image
							paragraphs {
								content
							}
							questionSections {
								instruction
								questionType
								options
								questions {
									content
									multipleChoices
								}
							}
						}
					}
				}
			}
		}
	}
`;

const GET_TEST_INFO = gql`
	query test($id: String) {
		test(id: $id) {
			id
			title
			author {
				username
			}
			image
			views
			rating {
				starAmount
				voteAmount
				votes {
					star
				}
			}
			testsTaken
			createdAt
		}
	}
`;

const GET_READING_TESTS = gql`
	{
		readingTests {
			id
			title
			author {
				username
			}
			testDetails {
				passages {
					title
					image
					paragraphs {
						content
					}
					questionSections {
						instruction
						questionType
						options
						questions {
							content
						}
					}
				}
			}
		}
	}
`;

const GET_READING_TEST = gql`
	query readingTest($id: String) {
		readingTest(id: $id) {
			id
			title
			author {
				username
			}
			testDetails {
				passages {
					title
					image
					paragraphs {
						content
					}
					questionSections {
						instruction
						questionType
						options
						questions {
							content
						}
					}
				}
			}
		}
	}
`;

const GET_READING_RESULT = gql`
	query getReadingResult($resultId: String) {
		getReadingResult(resultId: $resultId) {
			test {
				id
				title
				author {
					username
				}
				image
				views
				rating {
					starAmount
					voteAmount
				}
				testsTaken
				createdAt
			}
			user {
				username
				firstName
				lastName
				avatar
			}
			result {
				correctAnswers
				totalQuestions
				scoreBand
				timeSpent
			}
		}
	}
`;

const GET_READING_LEADERBOARD_BY_RESULT_ID = gql`
	query getReadingLeaderboardByResultId($orderBy: String, $resultId: String, $limit: Int, $offset: Int) {
		getReadingLeaderboardByResultId(orderBy: $orderBy, resultId: $resultId, limit: $limit, offset: $offset) {
			user {
				username
				firstName
				lastName
			}
			result {
				scoreBand
				timeSpent
			}
		}
	}
`;

const GET_READING_LEADERBOARD_BY_TEST_ID = gql`
	query getReadingLeaderboardByTestId($orderBy: String, $testId: String, $limit: Int, $offset: Int) {
		getReadingLeaderboardByTestId(orderBy: $orderBy, testId: $testId, limit: $limit, offset: $offset) {
			user {
				username
				firstName
				lastName
			}
			result {
				scoreBand
				timeSpent
			}
		}
	}
`;

export default {
	GET_TESTS,
	GET_TEST,
	GET_TEST_INFO,
	GET_READING_TEST,
	GET_READING_TESTS,
	GET_READING_RESULT,
	GET_READING_LEADERBOARD_BY_RESULT_ID,
	GET_READING_LEADERBOARD_BY_TEST_ID,
};
