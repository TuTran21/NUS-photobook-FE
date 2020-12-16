import React, { useState } from 'react';
import { Modal, Slide, IconButton, Button, TextField, Select, MenuItem, InputLabel } from '@material-ui/core';
import styled, { css } from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import { Formik } from 'formik';
import { FormattedMessage, injectIntl } from 'react-intl';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import UserMutations from 'graphql/mutations/User/';
import { useMutation } from '@apollo/client';
import { getMessage } from 'utils/messageConvert';

const ModalWrapper = styled.div``;

const ModalSlide = styled(Slide)`
	margin-left: auto;
	height: 100%;
	min-width: 330px;
	max-width: 600px;
	background-color: white;
`;

const CloseButton = styled(IconButton)`
	position: absolute !important;
	top: 5px;
	right: 10px;
`;

const Title = styled.h5`
	padding-left: 50px;
	padding-top: 50px;
`;

const ModalHeader = styled.div`
	padding: 0 !important;
	min-height: 50px;
	border: none !important;
	display: flex;
	align-items: center;
	position: relative;
`;

const ModalBody = styled.div`
	padding: 0 50px;
	padding-top: 10px;
`;

const FormActions = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin-top: 10px;
`;

const SubmitButton = styled.button`
	${props =>
		props.isLoading === 'true' &&
		css`
			padding-right: 2.5rem;
		`};
`;

function EditUserModal(props) {
	const { open, onClose, intl, userData, updateUser, updateUserRes } = props;

	let title, submitButtonText;

	if (!userData) {
		onClose();
	}

	title = 'Edit user';
	submitButtonText = 'Submit';
	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
			style={{ outline: 'none' }}
		>
			<ModalSlide direction="left" in={open} mountOnEnter unmountOnExit>
				<ModalWrapper>
					<ModalHeader>
						<Title>{title}</Title>
						<CloseButton onClick={onClose}>
							<CloseIcon></CloseIcon>
						</CloseButton>
					</ModalHeader>
					<ModalBody>
						<Formik
							initialValues={userData}
							validate={values => {
								const errors = {};

								if (!values.email) {
									// https://github.com/formatjs/react-intl/blob/master/docs/API.md#injection-api
									errors.email = intl.formatMessage({
										id: 'AUTH.VALIDATION.REQUIRED_FIELD',
									});
								} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
									errors.email = intl.formatMessage({
										id: 'AUTH.VALIDATION.INVALID_FIELD',
									});
								}

								if (!values.username) {
									errors.username = intl.formatMessage({
										id: 'AUTH.VALIDATION.REQUIRED_FIELD',
									});
								}

								if (!values.lastName) {
									errors.lastName = intl.formatMessage({
										id: 'AUTH.VALIDATION.REQUIRED_FIELD',
									});
								}

								if (!values.firstName) {
									errors.firstName = intl.formatMessage({
										id: 'AUTH.VALIDATION.REQUIRED_FIELD',
									});
								}

								return errors;
							}}
							onSubmit={(values, { setStatus, setSubmitting }) => {
								const user = {
									id: values.id,
									email: values.email,
									username: values.username,
									firstName: values.firstName,
									lastName: values.lastName,
									isVerified: values.isVerified,
									userType: values.userType,
								};

								updateUser({
									variables: {
										user: user,
									},
								});
								return;
							}}
						>
							{({ values, status, errors, touched, handleChange, handleBlur, handleSubmit }) => (
								<form noValidate={true} autoComplete="off" className="kt-form" onSubmit={handleSubmit}>
									<div>
										<TextField
											type="email"
											label="Email"
											margin="normal"
											className="kt-width-full"
											name="email"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.email}
											helperText={touched.email && errors.email}
											error={Boolean(touched.email && errors.email)}
										/>
									</div>

									<div>
										<TextField
											type="text"
											label="Username"
											margin="normal"
											className="kt-width-full"
											name="username"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.username}
											helperText={touched.username && errors.username}
											error={Boolean(touched.username && errors.username)}
										/>
									</div>

									<div>
										<TextField
											type="text"
											margin="normal"
											label="First name"
											className="kt-width-full"
											name="firstName"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.firstName}
											helperText={touched.firstName && errors.firstName}
											error={Boolean(touched.firstName && errors.firstName)}
										/>
									</div>

									<div>
										<TextField
											type="text"
											margin="normal"
											label="Last name"
											className="kt-width-full"
											name="lastName"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.lastName}
											helperText={touched.lastName && errors.lastName}
											error={Boolean(touched.lastName && errors.lastName)}
										/>
									</div>

									<div className="d-flex justify-content-between">
										<TextField
											label="Verified"
											name="isVerified"
											value={values.isVerified}
											onChange={handleChange}
											onBlur={handleBlur}
											select
											style={{ width: '47%' }}
											className="mt-4"
										>
											<MenuItem value={false}>FALSE</MenuItem>
											<MenuItem value={true}>TRUE</MenuItem>
										</TextField>
										<TextField
											label="Role"
											name="userType"
											value={values.userType}
											style={{ width: '47%' }}
											onChange={handleChange}
											onBlur={handleBlur}
											select
											className="mt-4"
										>
											<MenuItem value="USER">User</MenuItem>
											<MenuItem value="ADMIN">Admin</MenuItem>
										</TextField>
									</div>

									<FormActions>
										<SubmitButton
											id="kt_update_user_submit"
											type="submit"
											disabled={updateUserRes.loading}
											isLoading={updateUserRes.loading.toString()}
											className={`btn btn-primary mt-3 btn-elevate kt-login__btn-primary ${clsx({
												'kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light':
													updateUserRes.loading,
											})}`}
										>
											{submitButtonText}
										</SubmitButton>
									</FormActions>
								</form>
							)}
						</Formik>
					</ModalBody>
				</ModalWrapper>
			</ModalSlide>
		</Modal>
	);
}

EditUserModal.propTypes = {
	open: PropTypes.bool.isRequired,
	// Favorite: PropTypes.function.isRequired,
	onClose: PropTypes.func.isRequired,
	intl: PropTypes.object.isRequired,
};

export default injectIntl(withSnackbar(EditUserModal));
