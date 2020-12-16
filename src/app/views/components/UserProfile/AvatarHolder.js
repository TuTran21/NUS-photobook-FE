import React from 'react';
import { Avatar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Theme from 'app/themes/styles';
import styled from 'styled-components';
import LoadingIndicator from '../common/LoadingIndicator';

const TextAvatar = React.lazy(() => import('app/views/components/UserProfile/TextAvatar'));

const GenerateAvatarFromName = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	background-color: ${Theme.ncpPrimary};
	color: ${Theme.ncpWhite};
`;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	large: {
		width: '140px',
		height: '140px',
	},
}));

function AvatarHolder(props) {
	const { avatar, username, firstName, lastName, previewSrc } = props;
	const classes = useStyles();
	const displayName = firstName && lastName ? firstName + ' ' + lastName : username;
	return (
		<React.Fragment>
			{previewSrc ? (
				<Avatar className={classes.large} src={previewSrc}></Avatar>
			) : avatar ? (
				<Avatar className={classes.large} src={avatar}></Avatar>
			) : (
				<React.Suspense fallback={<LoadingIndicator hasSpacing></LoadingIndicator>}>
					<TextAvatar
						username={username}
						firstName={firstName}
						lastName={lastName}
						className={classes.large}
					></TextAvatar>
				</React.Suspense>
			)}
		</React.Fragment>
	);
}

export default AvatarHolder;
