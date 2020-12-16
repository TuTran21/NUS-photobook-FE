import React, { Component, useState, useEffect } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import { Link, Redirect, useParams } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import clsx from 'clsx';
import { withSnackbar } from 'notistack';
import * as _ from 'lodash';
import styled, { css } from 'styled-components';
import CheckIcon from '@material-ui/icons/Check';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
// import * as auth from '../../store/ducks/auth.duck';
// import { requestPassword } from '../../crud/auth.crud';

const LoadingIndicator = styled.svg`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 0 !important;
	height: 50px;
	width: 50px;
	margin-top: 40px;
	margin-bottom: 40px;
	${props =>
		props.loading === 'false' &&
		css`
			display: none;
		`};
`;

const SuccessIndicator = styled(CheckIcon)`
	display: none !important;
	width: 50px !important;
	height: 50px !important;
	margin-top: 40px;
	margin-bottom: 40px;
	${props =>
		props.isSuccess === 'true' &&
		props.loading === 'false' &&
		css`
			display: block !important;
		`};
`;

const FailureIndicator = styled(ErrorOutlineIcon)`
	display: none !important;
	width: 50px !important;
	height: 50px !important;
	margin-top: 40px;
	margin-bottom: 40px;
	color: rgb(220, 0, 78);
	${props =>
		props.isSuccess === 'false' &&
		props.loading === 'false' &&
		css`
			display: block !important;
		`};
`;

const BodyWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	min-height: 400px;
`;

function VerifyEmailForm(props) {
	const { intl, handleVerifyEmailPromise } = props;
	let { token } = useParams();
	const [isSuccess, setIsSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState(
		intl.formatMessage({
			id: 'PLEASE_WAIT',
		}),
	);

	const enableLoading = () => {
		setLoading(true);
	};

	const disableLoading = () => {
		setLoading(false);
	};

	const handleVerify = () => {
		enableLoading();
		handleVerifyEmailPromise(token)
			.then(res => {
				verifySuccess(res);
			})
			.catch(err => {
				verifyError(err);
			});
	};

	const verifyError = err => {
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
		setStatus(
			intl.formatMessage({
				id: message,
			}),
		);
	};

	const verifySuccess = res => {
		disableLoading();
		setStatus(
			intl.formatMessage({
				id: 'AUTH.VERIFY_EMAIL.SUCCESS',
			}),
		);
		setIsSuccess(true);
	};

	useEffect(() => {
		handleVerify();
	}, []);

	if (isSuccess) {
		setTimeout(() => {
			props.history.push('/auth');
		}, 3000);
	}

	return (
		<BodyWrapper>
			<h3>
				<FormattedMessage id="AUTH.VERIFY_EMAIL.TITLE" />
			</h3>
			<LoadingIndicator loading={loading.toString()} className="spinner" viewBox="0 0 50 50">
				<circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
			</LoadingIndicator>
			<SuccessIndicator
				loading={loading.toString()}
				color="secondary"
				isSuccess={isSuccess.toString()}
			></SuccessIndicator>
			<FailureIndicator loading={loading.toString()} isSuccess={isSuccess.toString()}></FailureIndicator>
			<h5>{status}</h5>
		</BodyWrapper>
	);
}

export default injectIntl(VerifyEmailForm);
