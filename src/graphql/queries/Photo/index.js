/**
 * Login user query
 */

import gql from 'graphql-tag';

const GET_PHOTOS = gql`
	{
		photos {
			id
			title
			image {
				url
			}
			description
			user {
				username
				avatar
			}
			views
			likes {
				username
				avatar
			}
			createdAt
		}
	}
`;

const GET_PHOTO = gql`
	query photo($id: String) {
		photo(id: $id) {
			id
			title
			image {
				url
			}
			description
			user {
				username
				avatar
			}
			views
			likes {
				username
				avatar
			}
			createdAt
		}
	}
`;

export default { GET_PHOTOS, GET_PHOTO };
