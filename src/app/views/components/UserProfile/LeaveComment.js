import React, { useState } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import styled from 'styled-components';
import Theme from 'app/themes/styles';
import LoadingIndicator from 'app/views/components/common/LoadingIndicator';

const SubmitButton = styled(Button)`
	margin-left: auto;
	margin-top: 15px !important;
	align-self: flex-end;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	background-color: ${Theme.ncpWhite};
	padding: 24px;
`;

function LeaveComment(props) {
	const { isOwner = false, postComment, loading, userId } = props;
	const CommentLabel = isOwner ? 'Post something on your wall' : 'Let them know you were here';
	const [content, changeContent] = useState('');
	const [contentError, changeContentError] = useState('');

	const handleOnChange = event => {
		changeContent(event.target.value);
	};

	const handlePostComment = () => {
		if (content.length === 0) {
			changeContentError('Cannot leave an empty message');
			return;
		} else {
			changeContentError('');
		}
		postComment({ variables: { content: content, id: userId } });
	};

	return (
		<Wrapper className="card card-custom card-stretch gutter-b">
			<Typography variant="h5" component="p" style={{ marginBottom: '20px' }}>
				{CommentLabel}
			</Typography>

			<TextField
				fullWidth
				error={contentError ? true : false}
				id="outlined-multiline-static"
				label={contentError ? contentError : 'Leave a comment'}
				multiline
				rows={4}
				defaultValue=""
				variant="outlined"
				onChange={e => handleOnChange(e)}
			/>
			<SubmitButton
				variant="contained"
				color="primary"
				size="large"
				onClick={() => handlePostComment()}
				disabled={loading}
			>
				Submit
				{loading && (
					<LoadingIndicator
						color="inherit"
						wrapperStyle={{ marginLeft: '10px' }}
						size="25px"
					></LoadingIndicator>
				)}
			</SubmitButton>
		</Wrapper>
	);
}

export default LeaveComment;
