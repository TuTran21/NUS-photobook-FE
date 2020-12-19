import { Skeleton } from '@material-ui/lab';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`;

const TextArea = styled.div`
	display: flex;
	flex-direction: column;
	width: 60%;
`;

function PhotoItemSkeleton(props) {
	return (
		<Wrapper>
			<Skeleton variant="rect" width={200} height={200} />
			<TextArea>
				<Skeleton variant="text" width="100%" />
				<Skeleton variant="text" width="100%" />
			</TextArea>
		</Wrapper>
	);
}

export default PhotoItemSkeleton;
