import React, { useEffect } from 'react';
import LoadingIndicator from 'app/views/components/common/LoadingIndicator';
import { useMutation } from '@apollo/client';
import UserMutations from 'graphql/mutations/User';
import { withSnackbar } from 'notistack';
import history from 'utils/history';

const AuthPage = React.lazy(() => import('app/views/pages/AuthPage/Injectable'));

function ConfirmEmail(props) {
	const emailToken = props.match.params.emailToken;
	const [verifyEmail, verifyEmailRes] = useMutation(UserMutations.CONFIRM_EMAIL, {
		variables: { emailToken },
		onCompleted: () => {
			history.push('/auth');
			props.enqueueSnackbar('Your email has been verified, you can now log in, thank you.', {
				variant: 'success',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right',
				},
			});
		},
		onError: () => {
			history.push('/auth');
			props.enqueueSnackbar('Something went wrong, please try again later or contact administrator to resolve.', {
				variant: 'error',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right',
				},
			});
		},
	});

	useEffect(() => {
		verifyEmail();
	}, []);

	return (
		<React.Suspense fallback={<LoadingIndicator hasSpacing></LoadingIndicator>}>
			<AuthPage></AuthPage>
		</React.Suspense>
	);
}

export default withSnackbar(ConfirmEmail);
