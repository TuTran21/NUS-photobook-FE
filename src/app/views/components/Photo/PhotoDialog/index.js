import React from 'react';

import styled from 'styled-components';
import { Typography, Card, Dialog, DialogTitle, Button } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { roundNumberToTwoDecimals } from 'utils/utils';
import { useHistory } from 'react-router-dom';
import Theme from 'app/themes/styles';
import { makeStyles } from '@material-ui/core/styles';
import PhotoPost from '../PhotoPost';

const Image = styled.img`
	width: 100%;
	height: auto;
	border-radius: 5px;
`;

const Title = styled(Typography)`
	margin-top: 25px !important;
	font-weight: 600 !important;
	text-align: center;

	&:hover {
		cursor: pointer;
		color: ${Theme.ncpTitleHover};
	}
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	&:hover {
		cursor: pointer;
	}
`;

const useStyles = makeStyles({
	dialog: {
		height: '500px',
		width: '500px',
	},
	title: {
		marginBottom: '20px',
	},
	content: {
		marginTop: '10px',
	},
});

const PhotoDialog = props => {
	const { id, open, title, description, image, handleClose, isOwner, isPublic } = props;
	const [edit, setEdit] = React.useState(false);
	const classes = useStyles();

	return (
		<Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
			{isOwner && (
				<Button color="primary" variant="contained" onClick={() => setEdit(!edit)}>
					{edit ? `Cancel` : `Edit`}
				</Button>
			)}
			{!edit && (
				<>
					<DialogTitle id="simple-dialog-title">{title}</DialogTitle>
					<Image src={image.url} alt="Image"></Image>
					<Typography className={classes.content}>{description}</Typography>
				</>
			)}

			{edit && (
				<PhotoPost
					id={id}
					isEdit={true}
					photoTitle={title}
					url={image}
					isPhotoPublic={isPublic}
					photoDescription={description}
				></PhotoPost>
			)}
		</Dialog>
	);
};

export default PhotoDialog;
