/**
 * Create User Mutation
 */

import gql from 'graphql-tag';

const CREATE_PHOTO = gql`
	mutation createPhoto($photo: CreatePhotoInput) {
		createPhoto(photo: $photo) {
			status
			message
		}
	}
`;

const UPDATE_PHOTO = gql`
	mutation updatePhoto($photo: UpdatePhotoInput) {
		updatePhoto(photo: $photo) {
			status
			message
		}
	}
`;

export default {
	CREATE_PHOTO,
	UPDATE_PHOTO,
};
