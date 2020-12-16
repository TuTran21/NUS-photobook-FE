/**
 * Login user query
 */

import gql from 'graphql-tag';

const GET_USERS = gql`
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

const GET_OVERALL_SCORE = gql`
	query user($userId: String) {
		getOverallScore(userId: $userId) {
			reading
			writing
			listening
		}
	}
`;

const GET_RPG_ELEMENT = gql`
	query getRpgElement($userId: String) {
		getRpgElement(userId: $userId) {
			experience
			title
			level
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

export default { GET_USERS, GET_MY_PROFILE, GET_USER, GET_OVERALL_SCORE, GET_RPG_ELEMENT, GET_WALL_POSTS };
