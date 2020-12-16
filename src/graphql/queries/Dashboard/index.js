import gql from 'graphql-tag';

const VERIFY_ADMIN_ACCESS_TOKEN = gql`
	query verifyAdminAccessToken {
		verifyAdminAccessToken {
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

export default { VERIFY_ADMIN_ACCESS_TOKEN };
