/**
 * Login user query
 */

import gql from 'graphql-tag';

const GET_PHOTOS = gql`
	query photos($offset: Int, $limit: Int, $isPublic: Boolean, $isOwner: Boolean) {
		photos(offset: $offset, limit: $limit, isPublic: $isPublic, isOwner: $isOwner) {
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
			isOwner
			isPublic
		}
	}
`;

export default { GET_PHOTOS, GET_PHOTO };
