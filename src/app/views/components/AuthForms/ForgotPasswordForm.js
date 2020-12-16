import React, { Component, useState } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import clsx from 'clsx';
import { withSnackbar } from 'notistack';
// import * as auth from '../../store/ducks/auth.duck';
// import { requestPassword } from '../../crud/auth.crud';

function ForgotPasswordForm(props) {
	const { intl, handleForgotPasswordPromise, handleChangeFormType } = props;
	const [isRequested, setRequested] = useState(false);
	const [loading, setLoading] = useState(false);
	const [loadingButtonStyle, setLoadingButtonStyle] = useState({
		paddingRight: '2.5rem',
	});
	const enableLoading = () => {
		setLoading(true);
		setLoadingButtonStyle({ paddingRight: '3.5rem' });
	};

	const disableLoading = () => {
		setLoading(false);
		setLoadingButtonStyle({ paddingRight: '2.5rem' });
	};

	const forgotError = (err, setStatus, setSubmitting) => {
		disableLoading();
		let message = '';
		switch (err.code) {
			case 404:
				message = 'AUTH.VALIDATION.USER_NOT_FOUND';
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
		setSubmitting(false);
		setStatus(
			intl.formatMessage({
				id: message,
			}),
		);
	};

	const forgotSuccess = (res, setStatus, setSubmitting) => {
		disableLoading();
		props.enqueueSnackbar(
			intl.formatMessage({
				id: 'AUTH.FORGOT.REQUEST_SUCCESS',
			}),
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
				id: 'AUTH.FORGOT.REQUEST_SUCCESS',
			}),
		);
		setRequested(true);
	};

	if (isRequested) {
		return <Redirect to="/auth" />;
	}

	return (
		<div className="kt-grid__item kt-grid__item--fluid  kt-grid__item--order-tablet-and-mobile-1  kt-login__wrapper">
			<div className="kt-login__body">
				<div className="kt-login__form">
					<div className="kt-login__title">
						<h3>
							<FormattedMessage id="AUTH.FORGOT.TITLE" />
						</h3>
					</div>

					<Formik
						initialValues={{ email: '' }}
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

							return errors;
						}}
						onSubmit={(values, { setStatus, setSubmitting }) => {
							enableLoading();
							setTimeout(() => {
								const payload = { email: values.email };
								handleForgotPasswordPromise(payload)
									.then(res => {
										forgotSuccess(res, setStatus, setSubmitting);
									})
									.catch(err => {
										forgotError(err, setStatus, setSubmitting);
									});
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
						}) => (
							<form onSubmit={handleSubmit} className="kt-form">
								{status && (
									<div role="alert" className="alert alert-danger">
										<div className="alert-text">{status}</div>
									</div>
								)}

								<div className="form-group">
									<TextField
										type="email"
										label="Email"
										margin="normal"
										fullWidth={true}
										name="email"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.email}
										helperText={touched.email && errors.email}
										error={Boolean(touched.email && errors.email)}
									/>
								</div>

								<div className="kt-login__actions">
									{handleChangeFormType ? (
										<Button
											onClick={() => handleChangeFormType('login')}
											className="btn btn-secondary btn-elevate kt-login__btn-secondary d-flex align-items-center"
										>
											{intl.formatMessage({
												id: 'AUTH.GENERAL.BACK_BUTTON',
											})}
										</Button>
									) : (
										<Link
											to="/auth"
											className="btn btn-secondary btn-elevate kt-login__btn-secondary d-flex align-items-center"
										>
											{intl.formatMessage({
												id: 'AUTH.GENERAL.BACK_BUTTON',
											})}
										</Link>
									)}

									<Button
										variant="contained"
										color="primary"
										type="submit"
										className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx({
											'kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light': loading,
										})}`}
										style={loadingButtonStyle}
										disabled={isSubmitting}
									>
										{intl.formatMessage({
											id: 'AUTH.GENERAL.SUBMIT_BUTTON',
										})}
									</Button>
								</div>
							</form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
}

export default injectIntl(withSnackbar(ForgotPasswordForm));
