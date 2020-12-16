import { Skeleton } from '@material-ui/lab';
import React from 'react';
import styled from 'styled-components';

const ImageWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 97.5px;
	height: 58.84px;
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 58.84px;
`;

const InfoWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding-right: 1.25rem;
	padding-left: 1rem;
	width: 80%;
`;

function BlogListItemSkeleton(props) {
	return (
		<>
			<Wrapper>
				<ImageWrapper>
					<Skeleton variant="rect" width={97.5} height={58.84} />
				</ImageWrapper>
				<InfoWrapper>
					<Skeleton variant="text" width="100%" />
					<Skeleton variant="text" width="100%" />
					<Skeleton variant="text" width="100%" />
				</InfoWrapper>
			</Wrapper>
		</>
	);
}

export default BlogListItemSkeleton;
