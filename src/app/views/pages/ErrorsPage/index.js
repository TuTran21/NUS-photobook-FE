/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/pages/auth/AuthPage`, `src/pages/home/HomePage`).
 */

import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

// import img404 from 'app/assets/media/error/404.jpg';
// import img400 from 'app/assets/media/error/400.jpg';
// import img401or403 from 'app/assets/media/error/401or403.jpg';
// import img500 from 'app/assets/media/error/500.jpg';

const img404 =
	'https://res.cloudinary.com/doyyjeich/image/upload/v1597304907/onlineExam/assets/backgrounds/404_kk3ztm.jpg';
const img400 =
	'https://res.cloudinary.com/doyyjeich/image/upload/v1597304906/onlineExam/assets/backgrounds/400_xwnofq.jpg';
const img401or403 =
	'https://res.cloudinary.com/doyyjeich/image/upload/v1597304907/onlineExam/assets/backgrounds/401or403_jxh5f8.jpg';
const img500 =
	'https://res.cloudinary.com/doyyjeich/image/upload/v1597304910/onlineExam/assets/backgrounds/500_c7xorb.jpg';

const ErrorCode = styled.h1`
	font-size: 150px;
	color: #595d6e;
	font-weight: 700;
`;

const ErrorContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 150px;
	padding: 0px 50px;
	flex-direction: column;
`;

const ErrorTitle = styled.p`
	color: #595d6e;
	font-weight: 500;
	font-size: 50px;
	margin-top: -5px;
`;

const ErrorDescription = styled.p`
	color: #595d6e;
	font-size: 20px;
	margin-top: -10px;
	font-weight: 400;
`;
const ErrorCases = [
	{
		code: 400,
		name: 'Bad Request',
		image: img400,
		message: { title: 'Bad request', description: 'Request was done incorrectly, please try again' },
	},
	{
		code: 401,
		name: 'Unauthorized',
		image: img401or403,
		message: { title: 'Unauthorized', description: 'You are tresspassing, turn back now' },
	},
	{
		code: 403,
		name: 'Forbidden',
		image: img401or403,
		message: { title: 'Forbidden', description: 'You are tresspassing, turn back now' },
	},
	{
		code: 404,
		name: 'Page Not Found',
		image: img404,
		message: { title: 'Page not found', description: 'Nothing left to do here' },
	},
	{
		code: 500,
		name: 'Internal Server Error',
		image: img500,
		message: {
			title: 'Internal Server Error',
			description: 'Please wait while we fix this issue. Here, have a pizza instead.',
		},
	},
];

export default function ErrorsPage(props) {
	const { code = 404 } = props;

	const currentCase = ErrorCases.find(x => x.code == code);

	return (
		<>
			<div className="kt-grid kt-grid--ver kt-grid--root">
				<div
					className="kt-grid__item kt-grid__item--fluid kt-grid kt-error-v4"
					style={{
						backgroundImage: `url(${currentCase.image})`,
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center',
					}}
				>
					<ErrorContainer className="kt-error_container">
						<ErrorCode className="kt-error_number">{currentCase.code}</ErrorCode>
						<ErrorTitle className="kt-error_title">{currentCase.message.title}</ErrorTitle>
						<ErrorDescription className="kt-error_description">
							{currentCase.message.description}
						</ErrorDescription>
					</ErrorContainer>
				</div>
			</div>
		</>
	);
}
