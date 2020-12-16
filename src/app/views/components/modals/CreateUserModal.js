import React, { useState } from 'react';
import { Modal, Slide, IconButton, Button, TextField, Select, MenuItem, InputLabel } from '@material-ui/core';
import styled, { css } from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import { Formik } from 'formik';
import { FormattedMessage, injectIntl } from 'react-intl';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { TrendingUpRounded } from '@material-ui/icons';

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

function CreateUserModal(props) {
	const { open, onClose, intl, createUser, createUserRes } = props;

	let title, submitButtonText;

	const handleSuccess = (res, setStatus, setSubmitting) => {
		setSubmitting(false);
	};

	const handleFailure = (err, setStatus, setSubmitting) => {
		setSubmitting(false);
	};

	title = 'Create new user';
	submitButtonText = 'Submit';
	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
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
							initialValues={{
								email: '',
								username: '',
								password: '',
								lastname: '',
								// middlename: '',
								firstname: '',
								phone: '',
								userType: 'user',
								isVerified: false,
							}}
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

								if (!values.password) {
									errors.password = intl.formatMessage({
										id: 'AUTH.VALIDATION.REQUIRED_FIELD',
									});
								}

								if (!values.lastname) {
									errors.lastname = intl.formatMessage({
										id: 'AUTH.VALIDATION.REQUIRED_FIELD',
									});
								}
								// if (!values.middlename) {
								// 	errors.middlename = intl.formatMessage({
								// 		id: 'AUTH.VALIDATION.REQUIRED_FIELD',
								// 	});
								// }
								if (!values.firstname) {
									errors.firstname = intl.formatMessage({
										id: 'AUTH.VALIDATION.REQUIRED_FIELD',
									});
								}

								if (!values.phone) {
									errors.phone = intl.formatMessage({
										id: 'AUTH.VALIDATION.REQUIRED_FIELD',
									});
								}
								return errors;
							}}
							onSubmit={(values, { setStatus, setSubmitting }) => {
								const user = {
									email: values.email,
									password: values.password,
									username: values.username,
									firstName: values.firstname,
									// middleName: values.middlename,
									lastName: values.lastname,
									phone: values.phone,
									userType: values.userType,
									isVerified: values.isVerified,
								};
								createUser({
									variables: {
										user: user,
									},
								});
								return;
							}}
						>
							{({
								values,
								status,
								errors,
								touched,
								handleChange,
								handleBlur,
								handleSubmit,
								isSubmitting,
							}) => (
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
											type="password"
											margin="normal"
											label="Password"
											className="kt-width-full"
											name="password"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.password}
											helperText={touched.password && errors.password}
											error={Boolean(touched.password && errors.password)}
										/>
									</div>

									<div>
										<TextField
											type="text"
											margin="normal"
											label="Firstname"
											className="kt-width-full"
											name="firstname"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.firstname}
											helperText={touched.firstname && errors.firstname}
											error={Boolean(touched.firstname && errors.firstname)}
										/>
									</div>

									<div>
										<TextField
											type="text"
											margin="normal"
											label="Lastname"
											className="kt-width-full"
											name="lastname"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.lastname}
											helperText={touched.lastname && errors.lastname}
											error={Boolean(touched.lastname && errors.lastname)}
										/>
									</div>
									{/* 
									<div>
										<TextField
											type="text"
											margin="normal"
											label="Middlename"
											className="kt-width-full"
											name="middlename"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.middlename}
											helperText={touched.middlename && errors.middlename}
											error={Boolean(touched.middlename && errors.middlename)}
										/>
									</div> */}
									<div>
										<TextField
											type="text"
											margin="normal"
											label="Phone"
											className="kt-width-full"
											name="phone"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.phone}
											helperText={touched.phone && errors.phone}
											error={Boolean(touched.phone && errors.phone)}
										/>
									</div>

									<div className="row">
										<div className="col-6">
											{' '}
											<TextField
												label="Verified"
												name="isVerified"
												value={values.isVerified}
												onChange={handleChange}
												onBlur={handleBlur}
												style={{ display: 'block' }}
												select
												fullWidth
												className="mt-4"
											>
												<MenuItem value={true}>TRUE</MenuItem>
												<MenuItem value={false}>FALSE</MenuItem>
											</TextField>
										</div>
										<div className="col-6">
											<TextField
												label="Role"
												name="userType"
												fullWidth
												value={values.userType}
												onChange={handleChange}
												onBlur={handleBlur}
												style={{ display: 'block' }}
												select
												className="mt-4"
											>
												<MenuItem value="user">User</MenuItem>
												<MenuItem value="admin">Admin</MenuItem>
											</TextField>
										</div>
									</div>

									<FormActions>
										<SubmitButton
											id="kt_login_signin_submit"
											type="submit"
											disabled={createUserRes.loading}
											isLoading={createUserRes.loading.toString()}
											className={`btn btn-primary mt-3 btn-elevate kt-login__btn-primary ${clsx({
												'kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light':
													createUserRes.loading,
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

CreateUserModal.propTypes = {
	open: PropTypes.bool.isRequired,
	// Favorite: PropTypes.function.isRequired,
	onClose: PropTypes.func.isRequired,
	intl: PropTypes.object.isRequired,
};

export default injectIntl(withSnackbar(CreateUserModal));
