import React, { useState } from 'react';
import LoginForm from 'app/views/components/AuthForms/LoginForm';
import RegistrationForm from 'app/views/components/AuthForms/RegistrationForm';
import ForgotPasswordForm from 'app/views/components/AuthForms/ForgotPasswordForm';

import 'app/themes/styles/login/login-1.scss';

import { useLazyQuery, useMutation } from '@apollo/client';
import UserMutations from 'graphql/mutations/User';
import AuthQueries from 'graphql/queries/Auth';

export default function AuthPage(props) {
	const { dispatch, formTypeDefault = 'login' } = props;
	const [formType, changeFormType] = useState(formTypeDefault);
	const [login, loginRes] = useLazyQuery(AuthQueries.LOG_IN);
	const [register, registerRes] = useMutation(UserMutations.CREATE_USER);

	const handleLogin = (email, password) => {
		return login({
			variables: { email: email, password: password },
		});
	};

	const handleRegister = (email, password, username, firstName, lastName, phone) => {
		const parseStringPhone = phone.toString();
		return register({
			variables: {
				user: {
					email,
					password,
					username,
					firstName,
					lastName,
					phone: parseStringPhone,
				},
			},
		});
	};

	const handleChangeFormType = (value = 'login') => {
		changeFormType(value);
	};

	return (
		<div className="kt-grid kt-grid--ver kt-grid--root">
			<div id="kt_login" className="kt-grid kt-grid--hor kt-grid--root  kt-login kt-login--v1">
				<div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--desktop kt-grid--ver-desktop kt-grid--hor-tablet-and-mobile">
					<div className="kt-grid__item kt-grid__item--fluid  kt-grid__item--order-tablet-and-mobile-1  kt-login__wrapper">
						{formType === 'login' ? (
							<LoginForm
								dispatch={dispatch}
								loginRes={loginRes}
								handleChangeFormType={handleChangeFormType}
								handleLogin={handleLogin}
							/>
						) : null}
						{formType === 'register' ? (
							<RegistrationForm
								dispatch={dispatch}
								registerRes={registerRes}
								handleChangeFormType={handleChangeFormType}
								handleRegister={handleRegister}
							/>
						) : null}
						{formType === 'forgotPassword' ? (
							<ForgotPasswordForm
								handleChangeFormType={handleChangeFormType}
								dispatch={dispatch}
								handleForgotPasswordPromise={props.handleForgotPasswordPromise}
							/>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
}
