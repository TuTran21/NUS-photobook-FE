import React from 'react';
import LeaveComment from '../../../../components/UserProfile/LeaveComment';
import CommentSection from 'app/views/components/UserProfile/CommentSection';
import { useQuery, useMutation } from '@apollo/client';
import UserQueries from 'graphql/queries/User';
import UserMutations from 'graphql/mutations/User';

function ProfileStatusPanel(props) {
	const { isOwner, userId } = props;
	const wallPostsRes = useQuery(UserQueries.GET_WALL_POSTS, { variables: { userId: userId } });
	const [postComment, postCommentRes] = useMutation(UserMutations.POST_COMMENT, {
		onCompleted: () => {
			wallPostsRes.refetch();
		},
	});

	let posts = [];
	if (wallPostsRes.data) {
		posts = wallPostsRes.data.getWallPosts.posts;
	}

	return (
		<React.Fragment>
			<LeaveComment
				userId={userId}
				loading={postCommentRes.loading}
				postComment={postComment}
				isOwner={isOwner}
			></LeaveComment>
			<CommentSection posts={posts} loading={wallPostsRes.loading} userId={userId}></CommentSection>
		</React.Fragment>
	);
}

export default ProfileStatusPanel;
