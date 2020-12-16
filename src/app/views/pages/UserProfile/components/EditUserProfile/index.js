import React, { useState } from 'react';
import styled from 'styled-components';
import Theme from 'app/themes/styles';
import {
	Button,
	Grid,
	TextField,
	InputAdornment,
	IconButton,
	Input,
	OutlinedInput,
	FormControl,
	InputLabel,
	CircularProgress,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import UserMutations from 'graphql/mutations/User';
import { useMutation } from '@apollo/client';
import { withSnackbar } from 'notistack';

const SubmitButton = styled(Button)`
	margin-left: auto;
	margin-top: 35px !important;
	align-self: flex-end;
	transition: all 0.3s ease;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	background-color: ${Theme.ncpWhite};
	padding: 24px;
`;

function EditUserProfile(props) {
	const { refetchProfile, user } = props;
	const [updateProfile, updateProfileRes] = useMutation(UserMutations.UPDATE_USER, {
		onCompleted: () => {
			props.enqueueSnackbar('Success, your user details have been updated.', {
				variant: 'success',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right',
				},
			});
			refetchProfile();
		},
	});
	const [showPassword, setShowPassword] = useState(false);
	const [userDetails, updateUserDetails] = useState({
		avatar: user.avatar,
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		username: user.username,
		phone: user.phone,
		password: '',
	});

	const handleFormChange = event => {
		const newState = { ...userDetails, [event.target.name]: event.target.value };
		updateUserDetails(newState);
	};

	const handleToggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};

	const handleSubmit = () => {
		updateProfile({ variables: { user: userDetails } });
	};

	const { loading, error } = updateProfileRes;
	return (
		<Wrapper>
			<Grid container spacing={6}>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						id="outlined-username"
						label="Username"
						name="username"
						value={userDetails.username}
						onChange={handleFormChange}
						variant="outlined"
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						id="outlined-email"
						label="Email"
						name="email"
						value={userDetails.email}
						// onChange={handleFormChange}
						variant="outlined"
						disabled
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						id="outlined-firstName"
						label="First Name"
						name="firstName"
						value={userDetails.firstName}
						onChange={handleFormChange}
						variant="outlined"
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						id="outlined-lastName"
						label="Last Name"
						name="lastName"
						value={userDetails.lastName}
						onChange={handleFormChange}
						variant="outlined"
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						id="outlined-phone"
						label="Phone number"
						name="phone"
						value={userDetails.phone}
						onChange={handleFormChange}
						variant="outlined"
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel htmlFor="outlined-password">New password</InputLabel>
						<OutlinedInput
							id="outlined-password"
							name="password"
							value={userDetails.password}
							onChange={handleFormChange}
							type={showPassword ? 'text' : 'password'}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleToggleShowPassword}
										onMouseDown={handleMouseDownPassword}
									>
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							}
							labelWidth={100}
						/>
					</FormControl>
				</Grid>
			</Grid>
			<SubmitButton color="primary" size="large" variant="contained" onClick={() => handleSubmit()}>
				Submit{' '}
				{loading && (
					<CircularProgress style={{ marginLeft: '10px' }} color="inherit" size={20}></CircularProgress>
				)}
			</SubmitButton>
		</Wrapper>
	);
}

export default withSnackbar(EditUserProfile);
