import React from 'react';

import styled from 'styled-components';
import { Typography, Card, Dialog, DialogTitle } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { roundNumberToTwoDecimals } from 'utils/utils';
import { useHistory } from 'react-router-dom';
import Theme from 'app/themes/styles';
import { makeStyles } from '@material-ui/core/styles';

const Image = styled.img`
	width: 100%;
	height: auto;
	max-height: 250px;
	max-width: 250px;
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
	const { open, title, content, image, handleClose } = props;
	const classes = useStyles();

	console.log(open);
	return (
		<Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
			<DialogTitle id="simple-dialog-title">{title}</DialogTitle>
			<Image src={image} alt="Image"></Image>
			<Typography className={classes.content}>{content}</Typography>
		</Dialog>
	);
};

export default PhotoDialog;
