import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { TextField, Button } from '@material-ui/core';
import clsx from 'clsx';
import { withSnackbar } from 'notistack';
import AuthActions from 'state/ducks/auth/actions';
import { setToken } from 'utils/utils';
import { getMessage } from 'utils/messageConvert';
// import * as auth from '../../store/ducks/auth.duck';
// import { login } from '../../crud/auth.crud';

function LoginForm(props) {
	const { intl, handleLogin, handleChangeFormType, loginRes, dispatch } = props;
	const [loadingButtonStyle, setLoadingButtonStyle] = useState({
		paddingRight: '2.5rem',
	});
	const [statusState, setStatus] = useState('');
	const [isSubmittingState, setSubmitting] = useState(false);

	const loginError = err => {
		let message = getMessage(err.message);

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
		setSubmitting(false);
		setStatus(
			intl.formatMessage({
				id: message,
			}),
		);
	};

	const loginSuccess = res => {
		const user = res.activeUser;
		props.enqueueSnackbar(
			intl.formatMessage({
				id: 'AUTH.LOGIN.SUCCESS',
			}) + user.username || '',
			{
				variant: 'success',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right',
				},
			},
		);
		setSubmitting(false);
		setStatus(
			intl.formatMessage({
				id: 'AUTH.LOGIN.SUCCESS',
			}) + user.username || '',
		);
		dispatch(AuthActions.loginSuccess(res));
		const token = res.accessToken;
		const expireIn = res.tokenExpiration;
		setToken(token, expireIn);
	};

	if (loginRes.data) {
		loginSuccess(loginRes.data.login);
		loginRes.data = undefined;
	}

	if (loginRes.error) {
		loginError(loginRes.error);
		loginRes.error = undefined;
	}

	return (
		<>
			<div className="kt-login__head">
				<span className="kt-login__signup-label">Don't have an account yet?</span>
				&nbsp;&nbsp;
				{handleChangeFormType ? (
					<Button onClick={() => handleChangeFormType('register')} className="kt-link kt-login__signup-link">
						{intl.formatMessage({
							id: 'AUTH.GENERAL.SIGNUP_BUTTON',
						})}
						!
					</Button>
				) : (
					<Link to="/auth/registration" className="kt-link kt-login__signup-link">
						{intl.formatMessage({
							id: 'AUTH.GENERAL.SIGNUP_BUTTON',
						})}
						!
					</Link>
				)}
			</div>

			<div className="kt-login__body">
				<div className="kt-login__form">
					<div className="kt-login__title">
						<h3>
							{/* https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage */}
							<FormattedMessage id="AUTH.LOGIN.TITLE" />
						</h3>
					</div>

					<Formik
						initialValues={{
							email: '',
							password: '',
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

							if (!values.password) {
								errors.password = intl.formatMessage({
									id: 'AUTH.VALIDATION.REQUIRED_FIELD',
								});
							}

							return errors;
						}}
						onSubmit={values => {
							setSubmitting(true);
							setLoadingButtonStyle();
							return setTimeout(() => {
								handleLogin(values.email, values.password);
							}, 1000);
						}}
					>
						{({
							values,
							initialStatus = statusState,
							errors,
							touched,
							handleChange,
							handleBlur,
							handleSubmit,
						}) => (
							<form noValidate={true} autoComplete="off" className="kt-form" onSubmit={handleSubmit}>
								{initialStatus ? (
									<div role="alert" className="alert alert-danger">
										<div className="alert-text">{initialStatus}</div>
									</div>
								) : (
									<div role="alert" className="alert alert-info">
										<div className="alert-text">
											{intl.formatMessage({
												id: 'AUTH.LOGIN.DESC',
											})}
										</div>
									</div>
								)}

								<div className="form-group">
									<TextField
										type="email"
										label={intl.formatMessage({
											id: 'AUTH.INPUT.EMAIL',
										})}
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

								<div className="form-group">
									<TextField
										type="password"
										margin="normal"
										label={intl.formatMessage({
											id: 'AUTH.INPUT.PASSWORD',
										})}
										className="kt-width-full"
										name="password"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.password}
										helperText={touched.password && errors.password}
										error={Boolean(touched.password && errors.password)}
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
									<Button
										id="kt_login_signin_submit"
										type="submit"
										disabled={isSubmittingState}
										className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx({
											'kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light': isSubmittingState,
										})}`}
										variant="contained"
										color="primary"
										style={loadingButtonStyle}
									>
										{intl.formatMessage({
											id: 'AUTH.LOGIN.BUTTON',
										})}
									</Button>
								</div>
							</form>
						)}
					</Formik>
				</div>
			</div>
		</>
	);
}

export default injectIntl(withSnackbar(LoginForm));
