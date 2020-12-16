import React from 'react';
import styled from 'styled-components';
import { Typography, Card, IconButton } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { roundNumberToTwoDecimals } from 'utils/utils';
import { useHistory } from 'react-router-dom';
import Theme from 'app/themes/styles';
import PhotoDialog from '../PhotoDialog';
import { Favorite } from '@material-ui/icons';
const Image = styled.img`
	width: 100%;
	height: auto;
	max-height: 250px;
	max-width: 250px;
	border-radius: 5px;
`;

const Title = styled(Typography)`
	font-weight: 600 !important;
	text-align: center;

	&:hover {
		cursor: pointer;
		color: ${Theme.ncpTitleHover};
	}
`;

const Wrapper = styled(Card)`
	display: flex;
	align-items: center;
	justify-content: space-between;

	&:hover {
		cursor: pointer;
	}
`;

const Content = styled.p`
	margin-bottom: 0px;
	max-height: 150px;
	text-overflow: ellipsis;
`;

const VoteAmount = styled.em`
	color: #536b83;
	font-size: 12px;
	line-height: 1.5;
`;

const InfoWrapper = styled.span`
	padding: 10px;
`;

const RatingWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

const UserInfoWrapper = styled.div``;

const Date = styled.em`
	display: flex;
	align-items: center;
	color: #536b83;
	font-size: 12px;
	line-height: 1.5;
`;

function TestCardItem(props) {
	const { title, rating, image, content } = props;
	const [photoDialogOpen, setPhotoDialogOpen] = React.useState(false);

	const handleOpenDialog = () => {
		setPhotoDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setPhotoDialogOpen(false);
	};

	return (
		<Wrapper elevation={2}>
			<Image
				onClick={handleOpenDialog}
				src="https://ieltsonlinetests.com/sites/default/files/styles/latest_collection/public/2020-01/MTjul2020%403x.png"
				alt="Test Image"
			></Image>
			<InfoWrapper onClick={handleOpenDialog}>
				<UserInfoWrapper></UserInfoWrapper>
				<Title variant="h6" component="p">
					{title}
				</Title>
				<Content>
					{content}Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
					been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
					of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
					also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in
					the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
					with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
				</Content>
				<RatingWrapper>
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<IconButton color="default">
							<Favorite></Favorite>
						</IconButton>
						<VoteAmount>({rating.voteAmount} votes)</VoteAmount>
					</div>
					<Date>4th July, 2020</Date>
				</RatingWrapper>
			</InfoWrapper>
			<PhotoDialog
				open={photoDialogOpen}
				title={title}
				image={image}
				content={content}
				handleClose={handleCloseDialog}
			></PhotoDialog>
		</Wrapper>
	);
}

export default TestCardItem;
