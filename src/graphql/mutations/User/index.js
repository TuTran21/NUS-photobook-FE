/**
 * Create User Mutation
 */

import gql from 'graphql-tag';

const CREATE_USER = gql`
	mutation createUser($user: CreateUserInput) {
		createUser(user: $user) {
			status
			message
		}
	}
`;

const ADMIN_CREATE_USER = gql`
	mutation adminCreateUser($user: AdminCreateUserInput) {
		adminCreateUser(user: $user) {
			status
			message
		}
	}
`;
const UPDATE_USER = gql`
	mutation updateUser($user: UpdateUserInput) {
		updateUser(user: $user) {
			status
			message
		}
	}
`;

const ADMIN_UPDATE_USER = gql`
	mutation adminUpdateUser($user: AdminUpdateUserInput) {
		adminUpdateUser(user: $user) {
			status
			message
		}
	}
`;

const UPLOAD_AVATAR = gql`
	mutation uploadAvatar($file: String) {
		uploadAvatar(file: $file) {
			status
			message
		}
	}
`;

const POST_COMMENT = gql`
	mutation postComment($content: String, $id: String) {
		postComment(content: $content, id: $id) {
			status
			message
		}
	}
`;

const CONFIRM_EMAIL = gql`
	mutation verifyEmail($emailToken: String) {
		verifyEmail(emailToken: $emailToken) {
			status
			message
		}
	}
`;

const DELETE_MANY = gql`
	mutation deleteManyUsers($users: [String]) {
		deleteManyUsers(users: $users) {
			status
			message
		}
	}
`;

export default {
	ADMIN_UPDATE_USER,
	CREATE_USER,
	UPDATE_USER,
	UPLOAD_AVATAR,
	POST_COMMENT,
	CONFIRM_EMAIL,
	DELETE_MANY,
	ADMIN_CREATE_USER,
};
