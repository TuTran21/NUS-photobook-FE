export const getMessage = message => {
	switch (message) {
		case 'Only admins can perform this action':
			return 'AUTH.VALIDATION.NOT_ADMIN';
		case 'User does not exist':
			return 'AUTH.VALIDATION.USER_NOT_FOUND';

		case 'Password is incorrect':
			return 'AUTH.VALIDATION.INVALID_PASSWORD';

		case 'Email already exists':
			return 'AUTH.REGISTER.EMAIL_EXISTS';

		case 'Username already taken':
			return 'AUTH.REGISTER.USERNAME_EXISTS';

		case 'Username already exists':
			return 'AUTH.REGISTER.USERNAME_EXISTS';
		default:
			return 'TRY_AGAIN_LATER';
	}
};
