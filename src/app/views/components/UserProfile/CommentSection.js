import React from 'react';
import styled from 'styled-components';
import Theme from 'app/themes/styles';
import { useQuery } from '@apollo/client';
import UserQueries from 'graphql/queries/User';
import LoadingIndicator from 'app/views/components/common/LoadingIndicator';

const Comment = React.lazy(() => import('app/views/components/UserProfile/Comment'));

const Wrapper = styled.div`
	margin-top: 30px;
	display: flex;
	align-items: center;
	flex-direction: column;
`;

const CommentWrapper = styled.div`
	background-color: ${Theme.ncpWhite};
	min-height: 100px;
	width: 80%;
	padding: 20px;
`;

function CommentSection(props) {
	const { posts, loading } = props;

	if (!posts) {
		return null;
	}

	return (
		<Wrapper>
			{loading && <LoadingIndicator hasSpacing></LoadingIndicator>}
			{posts.map((post, idx) => {
				return (
					<React.Suspense key={idx} fallback={<LoadingIndicator hasSpacing></LoadingIndicator>}>
						<Comment key={idx} data={post}></Comment>
					</React.Suspense>
				);
			})}
		</Wrapper>
	);
}

export default CommentSection;
