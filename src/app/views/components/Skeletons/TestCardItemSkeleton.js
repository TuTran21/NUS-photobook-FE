import { Skeleton } from '@material-ui/lab';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

function TestCardItemSkeleton(props) {
	return (
		<Wrapper>
			<Skeleton variant="rect" width={200} height={200} />
			<Skeleton variant="text" width="100%" style={{ marginTop: '25px' }} />
			<Skeleton variant="text" width="100%" />
		</Wrapper>
	);
}

export default TestCardItemSkeleton;
