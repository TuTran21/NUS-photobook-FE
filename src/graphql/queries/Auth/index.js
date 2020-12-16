/**
 * Create Auth Queries
 */

import gql from 'graphql-tag';

const LOG_IN = gql`
	query login($email: String, $password: String) {
		login(email: $email, password: $password) {
			userId
			accessToken
			tokenExpiration
			activeUser {
				username
				avatar
				firstName
				lastName
				userType
			}
		}
	}
`;

const VERIFY_ACCESS_TOKEN = gql`
	query verifyAccessToken {
		verifyAccessToken {
			userId
			accessToken
			tokenExpiration
			activeUser {
				username
				avatar
				firstName
				lastName
			}
		}
	}
`;

export default { LOG_IN, VERIFY_ACCESS_TOKEN };
