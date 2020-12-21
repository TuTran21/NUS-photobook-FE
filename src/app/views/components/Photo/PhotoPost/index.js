import { Grid, Typography, Button, TextField, Card, Switch, FormControlLabel } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import './styles.scss';
import { useMutation } from '@apollo/client';
import { withSnackbar } from 'notistack';
import PhotoMutations from 'graphql/mutations/Photo';
import { FormattedMessage, injectIntl } from 'react-intl';

const Wrapper = styled(Card)`
	margin-top: 40px;
	margin-bottom: 20px;
	padding: 20px;
`;

const SubmitButton = styled(Button)`
	margin-left: auto;
`;

const PhotoPost = props => {
	const { id, photoTitle = '', photoDescription = '', isPhotoPublic = true, url = '', isEdit = false } = props;
	const [title, setTitle] = React.useState(photoTitle);
	const [isPublic, setIsPublic] = React.useState(isPhotoPublic);
	const [description, setDescription] = React.useState(photoDescription);
	const { intl } = props;
	const [submitPhoto, submitPhotoRes] = useMutation(PhotoMutations.CREATE_PHOTO, {
		onCompleted: () =>
			props.enqueueSnackbar(
				intl.formatMessage({
					id: 'PHOTO.CREATE.SUCCESS',
				}),
				{
					variant: 'success',
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right',
					},
				},
			),
		onError: () =>
			props.enqueueSnackbar(
				intl.formatMessage({
					id: 'TRY_AGAIN_LATER',
				}),
				{
					variant: 'error',
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right',
					},
				},
			),
	});

	const [updatePhoto, updatePhotoRes] = useMutation(PhotoMutations.UPDATE_PHOTO, {
		onCompleted: () =>
			props.enqueueSnackbar(
				intl.formatMessage({
					id: 'PHOTO.UPDATE.SUCCESS',
				}),
				{
					variant: 'success',
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right',
					},
				},
			),
		onError: () =>
			props.enqueueSnackbar(
				intl.formatMessage({
					id: 'TRY_AGAIN_LATER',
				}),
				{
					variant: 'error',
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right',
					},
				},
			),
	});

	const [photo, setPhoto] = React.useState({
		url: url,
	});

	const handleSubmit = () => {
		const newPhoto = {
			id: id,
			image: photo.url,
			title: title,
			isPublic: isPublic,
			description: description,
		};
		console.log(newPhoto);
		if (isEdit) {
			return updatePhoto({ variables: { photo: newPhoto } });
		}

		submitPhoto({ variables: { photo: newPhoto } });
	};

	const handleDescriptionChange = e => {
		setDescription(e.target.value);
	};

	const handleTitleChange = e => {
		setTitle(e.target.value);
	};

	const handleTogglePublic = e => {
		setIsPublic(e.target.checked);
	};

	const handleImageChange = e => {
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
			setPhoto({
				url: reader.result,
			});
		};

		reader.readAsDataURL(file);
	};

	const dialogTitle = isEdit ? 'PHOTO.UPDATE.TITLE' : 'PHOTO.CREATE.TITLE';

	return (
		<Wrapper>
			<Typography variant="h5" style={{ marginBottom: '20px' }}>
				{intl.formatMessage({
					id: dialogTitle,
				})}
			</Typography>
			<Grid container spacing={0}>
				<Grid item xs={12} md={4}>
					<input className="fileInput" type="file" onChange={e => handleImageChange(e)} />
					{photo.url && <img className="image-preview" src={photo.url} />}
					{!photo.url && <p>Please select and image for Preview</p>}
				</Grid>

				<Grid item xs={12} md={8}>
					<TextField
						id="outlined-multiline-static"
						label="Title"
						value={title}
						variant="outlined"
						fullWidth
						onChange={e => handleTitleChange(e)}
					/>
					<FormControlLabel
						control={
							<Switch checked={isPublic} onChange={handleTogglePublic} name="isPublic" color="primary" />
						}
						label="Is public ?"
					/>
					<TextField
						id="outlined-multiline-static"
						label="Description"
						value={description}
						multiline
						rows={6}
						variant="outlined"
						fullWidth
						onChange={e => handleDescriptionChange(e)}
					/>
				</Grid>
				<Grid item xs={12}>
					<SubmitButton color="primary" variant="contained" onClick={() => handleSubmit()}>
						Submit
					</SubmitButton>
				</Grid>
			</Grid>
		</Wrapper>
	);
};

export default injectIntl(withSnackbar(PhotoPost));
