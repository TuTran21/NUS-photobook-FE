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

export default {
	CREATE_PHOTO,
};
