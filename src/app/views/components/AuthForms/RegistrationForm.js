import React, { useState } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Checkbox, FormControlLabel, TextField, Button } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import clsx from 'clsx';
import styled from 'styled-components';

const ButtonGroup = styled.div``;

function RegistrationForm(props) {
	const { intl, handleRegister, handleChangeFormType, registerRes } = props;
	const [loading, setLoading] = useState(false);
	const [isRegistered, setRegistered] = useState(false);
	const [statusState, setStatus] = useState('');
	const [loadingButtonStyle, setLoadingButtonStyle] = useState({
		paddingRight: '2.5rem',
	});
	const enableLoading = () => {
		setLoading(true);
		setLoadingButtonStyle({ paddingRight: '3.5rem', height: '50px' });
	};

	const disableLoading = () => {
		setLoading(false);
		setLoadingButtonStyle({ paddingRight: '2.5rem' });
	};

	const registerError = err => {
		disableLoading();
		let message;
		switch (err.message) {
			case 'Email already exists':
				message = 'AUTH.REGISTER.EMAIL_EXISTS';
				break;
			case 'Username already taken':
				message = 'AUTH.REGISTER.USERNAME_EXISTS';
				break;
			case 500:
				message = 'SERVER_INTERNAL_ERROR';
				break;
			default:
				message = 'TRY_AGAIN_LATER';
				break;
		}
		props.enqueueSnackbar(
			intl.formatMessage({
				id: message,
			}),
			{
				variant: 'error',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right',
				},
			},
		);
		setStatus(
			intl.formatMessage({
				id: message,
			}),
		);
	};

	const registerSuccess = res => {
		disableLoading();
		props.enqueueSnackbar(
			intl.formatMessage({
				id: 'AUTH.REGISTER.SUCCESS',
			}),
			{
				variant: 'success',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right',
				},
			},
		);
		setStatus(
			intl.formatMessage({
				id: 'AUTH.REGISTER.SUCCESS',
			}),
		);

		if (handleChangeFormType) {
			handleChangeFormType('login');
			return null;
		}
		return <Redirect to="/auth" />;
	};

	if (registerRes.data) {
		registerSuccess(registerRes.data.createUser);
		registerRes.data = undefined;
	}

	if (registerRes.error) {
		registerError(registerRes.error);
		registerRes.error = undefined;
	}

	return (
		<div className="kt-login__body">
			<div className="kt-login__form">
				<div className="kt-login__title">
					<h3>
						<FormattedMessage id="AUTH.REGISTER.TITLE" />
					</h3>
				</div>

				<Formik
					initialValues={{
						email: '',
						fullname: '',
						username: '',
						password: '',
						firstName: '',
						lastName: '',
						phone: '',
						acceptTerms: true,
						confirmPassword: '',
					}}
					validate={values => {
						const errors = {};

						if (!values.email) {
							errors.email = intl.formatMessage({
								id: 'AUTH.VALIDATION.REQUIRED_FIELD',
							});
						} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
							errors.email = intl.formatMessage({
								id: 'AUTH.VALIDATION.INVALID_FIELD',
							});
						}

						if (!values.fullname) {
							errors.fullname = intl.formatMessage({
								id: 'AUTH.VALIDATION.REQUIRED_FIELD',
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

						if (!values.confirmPassword) {
							errors.confirmPassword = intl.formatMessage({
								id: 'AUTH.VALIDATION.REQUIRED_FIELD',
							});
						} else if (values.password !== values.confirmPassword) {
							errors.confirmPassword = intl.formatMessage({
								id: 'AUTH.VALIDATION.MISMATCH_PASSWORD',
							});
						}

						if (!values.acceptTerms) {
							errors.acceptTerms = intl.formatMessage({
								id: 'AUTH.VALIDATION.AGREEMENT_REQUIRED',
							});
						}

						return errors;
					}}
					onSubmit={(values, { setStatus, setSubmitting }) => {
						enableLoading();
						setTimeout(() => {
							handleRegister(
								values.email,
								values.password,
								values.username,
								values.firstName,
								values.lastName,
								values.phone,
							);
						}, 1000);
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
						initialStatus = statusState,
					}) => (
						<form onSubmit={handleSubmit} noValidate autoComplete="off">
							{status && (
								<div role="alert" className="alert alert-danger">
									<div className="alert-text">{status}</div>
								</div>
							)}

							<div className="form-group mb-0">
								<TextField
									fullWidth
									margin="normal"
									label={intl.formatMessage({ id: 'AUTH.INPUT.FULLNAME' })}
									className="kt-width-full"
									name="fullname"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.fullname}
									helperText={touched.fullname && errors.fullname}
									error={Boolean(touched.fullname && errors.fullname)}
								/>
							</div>

							<div className="form-group mb-0">
								<TextField
									fullWidth
									label={intl.formatMessage({ id: 'AUTH.INPUT.EMAIL' })}
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

							<div className="form-group mb-0">
								<TextField
									fullWidth
									margin="normal"
									label={intl.formatMessage({ id: 'AUTH.INPUT.USERNAME' })}
									className="kt-width-full"
									name="username"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.username}
									helperText={touched.username && errors.username}
									error={Boolean(touched.username && errors.username)}
								/>
							</div>

							<div className="form-group mb-0">
								<TextField
									fullWidth
									type="password"
									margin="normal"
									label={intl.formatMessage({ id: 'AUTH.INPUT.PASSWORD' })}
									className="kt-width-full"
									name="password"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.password}
									helperText={touched.password && errors.password}
									error={Boolean(touched.password && errors.password)}
								/>
							</div>

							<div className="form-group mb-0">
								<TextField
									fullWidth
									type="password"
									margin="normal"
									label={intl.formatMessage({ id: 'AUTH.INPUT.CONFIRM_PASSWORD' })}
									className="kt-width-full"
									name="confirmPassword"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.confirmPassword}
									helperText={touched.confirmPassword && errors.confirmPassword}
									error={Boolean(touched.confirmPassword && errors.confirmPassword)}
								/>
							</div>

							<div className="form-group mb-0">
								<TextField
									fullWidth
									margin="normal"
									label={intl.formatMessage({ id: 'AUTH.INPUT.FIRSTNAME' })}
									className="kt-width-full"
									name="firstName"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.firstName}
									helperText={touched.firstName && errors.firstName}
									error={Boolean(touched.firstName && errors.firstName)}
								/>
							</div>

							<div className="form-group mb-0">
								<TextField
									fullWidth
									margin="normal"
									label={intl.formatMessage({ id: 'AUTH.INPUT.LASTNAME' })}
									className="kt-width-full"
									name="lastName"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.lastName}
									helperText={touched.lastName && errors.lastName}
									error={Boolean(touched.lastName && errors.lastName)}
								/>
							</div>

							<div className="form-group">
								<TextField
									fullWidth
									type="number"
									margin="normal"
									label={intl.formatMessage({ id: 'AUTH.INPUT.PHONE' })}
									className="kt-width-full"
									name="phone"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.phone}
									helperText={touched.phone && errors.phone}
									error={Boolean(touched.phone && errors.phone)}
								/>
							</div>

							<div className="form-group mb-0">
								<FormControlLabel
									label={
										<>
											{intl.formatMessage({ id: 'AUTH.VALIDATION.I_AGREE_WITH_THE' })}
											<Link to="/terms" target="_blank" rel="noopener noreferrer">
												{intl.formatMessage({ id: 'AUTH.VALIDATION.TERMS_AND_CONDITIONS' })}
											</Link>
										</>
									}
									control={
										<Checkbox
											color="primary"
											name="acceptTerms"
											onBlur={handleBlur}
											onChange={handleChange}
											checked={values.acceptTerms}
										/>
									}
								/>
							</div>

							<div className="kt-login__actions">
								{handleChangeFormType ? (
									<Button
										onClick={() => handleChangeFormType('forgotPassword')}
										className="kt-link kt-login__link-forgot"
									>
										<FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
									</Button>
								) : (
									<Link to="/auth/forgot-password" className="kt-link kt-login__link-forgot">
										<FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
									</Link>
								)}

								<ButtonGroup>
									{handleChangeFormType ? (
										<Button
											onClick={() => handleChangeFormType('login')}
											className="btn btn-secondary btn-elevate kt-login__btn-secondary mr-2"
										>
											{intl.formatMessage({
												id: 'AUTH.GENERAL.BACK_BUTTON',
											})}
										</Button>
									) : (
										<Link to="/auth">
											<Button
												type="button"
												className="btn btn-secondary btn-elevate kt-login__btn-secondary mr-2"
											>
												{intl.formatMessage({
													id: 'AUTH.GENERAL.BACK_BUTTON',
												})}
											</Button>
										</Link>
									)}

									<Button
										variant="contained"
										color="primary"
										type="submit"
										disabled={loading || !values.acceptTerms}
										className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx({
											'kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light': loading,
										})}`}
										style={loadingButtonStyle}
									>
										{intl.formatMessage({
											id: 'AUTH.GENERAL.SUBMIT_BUTTON',
										})}
									</Button>
								</ButtonGroup>
							</div>
						</form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default injectIntl(withSnackbar(RegistrationForm));
