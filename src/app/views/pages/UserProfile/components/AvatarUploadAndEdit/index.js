import React, { useState } from 'react';
// import Avatar from 'utils/react-avatar-edit/src/avatar';
import styled from 'styled-components';
import AvatarHolder from 'app/views/components/UserProfile/AvatarHolder';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import UserMutations from 'graphql/mutations/User';
import LoadingIndicator from 'app/views/components/common/LoadingIndicator';
import { withSnackbar } from 'notistack';

const Avatar = React.lazy(() => import('utils/react-avatar-edit/src/avatar'));

const AvatarBlock = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px 0px;
`;

const AvatarHoverWrapper = styled.div`
	width: 200px;
	height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const EditAvatarButton = styled(Button)`
	position: absolute !important;
	bottom: 0;
	z-index: 500;
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

	username: {
		marginTop: '10px',
		textAlign: 'center',
	},
	extraInfo: {
		fontWeight: '300',
		textAlign: 'center',
		fontSize: '14px',
	},
}));
function AvatarUploadAndEdit(props) {
	const { user, isOwner, refetchProfile } = props;

	const [preview, setPreview] = useState('');
	const [isEditAvatar, setIsEditAvatar] = useState(false);
	const [isAvatarHover, setHover] = useState(false);
	const [uploadAvatar, uploadAvatarRes] = useMutation(UserMutations.UPLOAD_AVATAR, {
		onCompleted: () =>
			props.enqueueSnackbar('Success, your avatar has been updated', {
				variant: 'success',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right',
				},
			}),
	});

	const toggleHoverState = value => {
		return setHover(value);
	};

	const onClose = () => {
		setPreview('');
		setIsEditAvatar(false);
		return;
	};

	const onConfirm = preview => {
		uploadAvatar({ variables: { file: preview } });
		setPreview(preview);
		refetchProfile();
		setIsEditAvatar(false);
		return;
	};

	const onCrop = preview => {
		return setPreview(preview);
	};

	const onBeforeFileLoad = elem => {
		if (elem.target.files[0].size > 1000000) {
			props.enqueueSnackbar('Selected file size is too big (limit: 100MB) ', {
				variant: 'error',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right',
				},
			});
			elem.target.value = '';
		}
	};

	if (uploadAvatarRes.error) {
		props.enqueueSnackbar('Something went wrong with uploading your avatar, please try again later', {
			variant: 'error',
			anchorOrigin: {
				vertical: 'top',
				horizontal: 'right',
			},
		});
		uploadAvatarRes.error = undefined;
	}

	const { avatar, username, firstName, lastName } = user;
	const classes = useStyles();
	const displayName = firstName && lastName ? firstName + ' ' + lastName : username;
	return (
		<React.Fragment>
			<AvatarBlock className="card card-custom card-stretch gutter-b">
				<AvatarHoverWrapper>
					{isEditAvatar ? (
						<React.Suspense
							fallback={<LoadingIndicator wrapperStyle={{ positon: 'absolute', zIndex: '5' }} />}
						>
							<Avatar
								loading={uploadAvatarRes.loading}
								width={140}
								height={140}
								onCrop={onCrop}
								onConfirm={onConfirm}
								onClose={onClose}
								onBeforeFileLoad={onBeforeFileLoad}
							/>
						</React.Suspense>
					) : (
						<div
							onMouseEnter={() => toggleHoverState(true)}
							onMouseLeave={() => toggleHoverState(false)}
							style={{
								position: 'relative',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							{uploadAvatarRes.loading && (
								<LoadingIndicator wrapperStyle={{ position: 'absolute', zIndex: '5' }} />
							)}
							<AvatarHolder
								previewSrc={preview}
								avatar={user.avatar}
								username={user.username}
								firstName={user.firstName}
								lastName={user.lastName}
							></AvatarHolder>
							{isAvatarHover && isOwner && (
								<EditAvatarButton
									disabled={uploadAvatarRes.loading}
									variant="contained"
									color="secondary"
									onClick={() => setIsEditAvatar(true)}
								>
									Edit avatar
								</EditAvatarButton>
							)}
						</div>
					)}
				</AvatarHoverWrapper>

				<Typography variant="h5" className={classes.username}>
					{displayName}
				</Typography>
			</AvatarBlock>
		</React.Fragment>
	);
}

export default withSnackbar(AvatarUploadAndEdit);
