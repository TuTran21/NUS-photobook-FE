/**
 * Login user query
 */

import gql from 'graphql-tag';

const GET_PHOTOS = gql`
	{
		users {
			id
			firstName
			lastName
			email
			username
			isVerified
			userType
			createdAt
			updatedAt
			lastLogin
		}
	}
`;

const GET_MY_PROFILE = gql`
	{
		getMyProfile {
			userId
		}
	}
`;

const GET_USER = gql`
	query user($id: String) {
		user(id: $id) {
			user {
				id
				firstName
				lastName
				email
				username
				avatar
				phone
				socialProfile {
					rpg {
						experience
						title
						level
					}
					wall {
						posts {
							owner {
								avatar
								username
								firstName
								lastName
							}
							content
							reaction {
								likes {
									amount
								}
							}
						}
					}
				}
			}
			isOwner
		}
	}
`;

const GET_WALL_POSTS = gql`
	query getWallPosts($userId: String) {
		getWallPosts(userId: $userId) {
			posts {
				owner {
					id
					username
					avatar
				}
				content
				reaction {
					likes {
						amount
					}
				}
				createdAt
			}
		}
	}
`;

export default { GET_PHOTOS, GET_MY_PROFILE, GET_USER, GET_WALL_POSTS };
