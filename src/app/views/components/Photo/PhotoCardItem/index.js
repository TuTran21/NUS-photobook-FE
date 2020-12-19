import React from 'react';
import styled from 'styled-components';
import { Typography, Card, IconButton } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { roundNumberToTwoDecimals } from 'utils/utils';
import { useHistory } from 'react-router-dom';
import Theme from 'app/themes/styles';
import PhotoDialog from '../PhotoDialog';
import { Favorite } from '@material-ui/icons';
import moment from 'moment';
import config from 'global-config';
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
	const { id, title, rating, image, description, user, likes, createdAt } = props;
	const history = useHistory();

	const handleOpenDialog = () => {
		history.push(`/?view=${id}`);
	};

	return (
		<Wrapper elevation={2}>
			<Image onClick={handleOpenDialog} src={image.url} alt={`Photo by ${user.username}`}></Image>
			<InfoWrapper onClick={handleOpenDialog}>
				<UserInfoWrapper></UserInfoWrapper>
				<Title variant="h6" component="p">
					{title}
				</Title>
				<Content>{description}</Content>
				<RatingWrapper>
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<IconButton color="default">
							<Favorite></Favorite>
						</IconButton>
						<VoteAmount>({likes.length})</VoteAmount>
					</div>
					<Date>{moment(createdAt).format(config.DATE_FORMAT)}</Date>
				</RatingWrapper>
			</InfoWrapper>
		</Wrapper>
	);
}

export default TestCardItem;
