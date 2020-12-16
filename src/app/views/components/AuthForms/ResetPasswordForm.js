import React, { Component, useState } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import { Link, Redirect, useParams } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import clsx from 'clsx';
import { withSnackbar } from 'notistack';
import * as _ from 'lodash';
// import * as auth from '../../store/ducks/auth.duck';
// import { requestPassword } from '../../crud/auth.crud';

function ResetPasswordForm(props) {
	const { intl, handleResetPasswordPromise } = props;
	const [isRequested, setRequested] = useState(false);
	const [loading, setLoading] = useState(false);
	const [loadingButtonStyle, setLoadingButtonStyle] = useState({
		paddingRight: '2.5rem',
	});
	let { token } = useParams();
	const enableLoading = () => {
		setLoading(true);
		setLoadingButtonStyle({ paddingRight: '3.5rem' });
	};

	const disableLoading = () => {
		setLoading(false);
		setLoadingButtonStyle({ paddingRight: '2.5rem' });
	};

	// const getTokenFromUrl = () => {
	// 	const { match } = props;
	// 	console.log(match);
	// 	if (!_.isEmpty(_.get(match, 'params'))) {
	// 		const { token } = useParams();
	// 		return token;
	// 	}
	// 	return '';
	// };

	const resetError = (err, setStatus, setSubmitting) => {
		disableLoading();
		let message = '';
		switch (err.code) {
			case 400:
				message = 'TOKEN_EXPIRED';
				break;
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

	const resetSuccess = (res, setStatus, setSubmitting) => {
		disableLoading();
		props.enqueueSnackbar(
			intl.formatMessage({
				id: 'AUTH.RESET.SUCCESS',
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
							<FormattedMessage id="AUTH.RESET.TITLE" />
						</h3>
					</div>

					<Formik
						initialValues={{ newPassword: '', confirmPassword: '' }}
						validate={values => {
							const errors = {};

							if (!values.newPassword) {
								errors.newPassword = intl.formatMessage({
									id: 'AUTH.VALIDATION.REQUIRED_FIELD',
								});
							}

							if (!values.confirmPassword) {
								errors.confirmPassword = intl.formatMessage({
									id: 'AUTH.VALIDATION.REQUIRED_FIELD',
								});
							} else if (values.newPassword !== values.confirmPassword) {
								errors.confirmPassword = intl.formatMessage({
									id: 'AUTH.VALIDATION.MISMATCH_PASSWORD',
								});
							}

							return errors;
						}}
						onSubmit={(values, { setStatus, setSubmitting }) => {
							enableLoading();
							setTimeout(() => {
								const payload = { token: token, newPassword: values.newPassword };
								handleResetPasswordPromise(payload)
									.then(res => {
										resetSuccess(res, setStatus, setSubmitting);
									})
									.catch(err => {
										resetError(err, setStatus, setSubmitting);
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
								{status ? (
									<div role="alert" className="alert alert-danger">
										<div className="alert-text">{status}</div>
									</div>
								) : (
									<div role="alert" className="alert alert-info">
										<div className="alert-text">
											{intl.formatMessage({
												id: 'AUTH.RESET.DESC',
											})}
										</div>
									</div>
								)}

								<div className="form-group">
									<TextField
										type="password"
										label={intl.formatMessage({ id: 'AUTH.INPUT.PASSWORD' })}
										margin="normal"
										fullWidth={true}
										name="newPassword"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.newPassword}
										helperText={touched.newPassword && errors.newPassword}
										error={Boolean(touched.newPassword && errors.newPassword)}
									/>
								</div>

								<div className="form-group">
									<TextField
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

								<div className="kt-login__actions">
									<Link
										to="/auth"
										className="btn btn-secondary btn-elevate kt-login__btn-secondary d-flex align-items-center"
									>
										Back
									</Link>

									<button
										type="submit"
										className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx({
											'kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light': loading,
										})}`}
										style={loadingButtonStyle}
										disabled={isSubmitting}
									>
										Submit
									</button>
								</div>
							</form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
}

export default injectIntl(withSnackbar(ResetPasswordForm));
