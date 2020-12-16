import React from 'react';
import styled, { css } from 'styled-components';
import { CircularProgress } from '@material-ui/core';

const LoadingIndicatorComponent = styled(CircularProgress)`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 0 !important;

	// height: ${props => props.height};
	// width: ${props => props.width};

`;

const LoadingIndicatorWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	${props =>
		props.hasspacing === 'true' &&
		css`
			min-height: 300px;
			min-width: 300px;
		`}
`;

function LoadingIndicator(props) {
	const {
		size = '40px',
		width = '40px',
		height = '40px',
		wrapperStyle,
		hasSpacing = false,
		color = 'primary',
	} = props;
	return (
		<LoadingIndicatorWrapper style={wrapperStyle} hasspacing={hasSpacing.toString()}>
			<CircularProgress color={color} width={width} height={height} size={size}></CircularProgress>
		</LoadingIndicatorWrapper>
	);
}

export default LoadingIndicator;
