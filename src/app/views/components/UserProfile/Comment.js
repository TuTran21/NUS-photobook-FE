import React from 'react';
import styled from 'styled-components';
import Theme from 'app/themes/styles';
import { Avatar, Typography } from '@material-ui/core';
import LoadingIndicator from '../common/LoadingIndicator';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const TextAvatar = React.lazy(() => import('app/views/components/UserProfile/TextAvatar'));

const CommentWrapper = styled.div`
	background-color: ${Theme.ncpWhite};
	min-height: 100px;
	width: 80%;
	padding: 20px;
	margin-top: 15px;
`;

const AvatarAndDate = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const AvatarAndName = styled.div`
	display: flex;
	align-items: center;

	&:hover {
		cursor: pointer;
		color: ${Theme.ncpTitleHover};
	}
`;

const Name = styled(Typography)``;

const NameWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 15px;
	justify-content: center;
`;

const ExtraInfo = styled(Typography)`
	font-size: 12px;
`;

const DateHolder = styled.div``;

const Date = styled(Typography)``;

const Content = styled.div`
	margin-top: 20px;
`;

function Comment(props) {
	const { data } = props;
	const history = useHistory();

	if (!data) {
		return null;
	}

	const { owner, content, reaction, createdAt } = data;
	const { id } = owner;
	return (
		<CommentWrapper className="card card-custom card-stretch gutter-b">
			<AvatarAndDate>
				<AvatarAndName onClick={() => history.push(`/user/${id}`)}>
					{owner.avatar ? (
						<Avatar src={owner.avatar}></Avatar>
					) : (
						<React.Suspense fallback={<LoadingIndicator />}>
							<TextAvatar
								username={owner.username}
								firstName={owner.firstName}
								lastName={owner.lastName}
								style={{ height: '40px', width: '40px' }}
								fontSize="1.7rem"
							></TextAvatar>
						</React.Suspense>
					)}
					<NameWrapper>
						<Name variant="h6" component="p">
							{owner.username}
						</Name>
						<Date>{moment(createdAt).format('DD-MMM-YYYY')}</Date>
					</NameWrapper>
				</AvatarAndName>

				{/* <DateHolder></DateHolder> */}
			</AvatarAndDate>

			<Content>
				<Typography>{content}</Typography>
			</Content>
		</CommentWrapper>
	);
}

export default Comment;
