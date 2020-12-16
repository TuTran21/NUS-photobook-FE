/* eslint-disable react/jsx-props-no-spreading */
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import theme from 'utils/theme';

import WarningIcon from './WarningIcon.svg';

const Container = styled.div`
	background-color: #fce8e6;
	border: 1px solid ${theme.engError};
	box-sizing: border-box;
	margin-top: 25px;
	width: 100%;
	padding: 18px;

	span {
		color: ${theme.engError};
	}
`;

const Title = styled.span`
	display: flex;
	font-size: 14px;
	justify-content: flex-start;
	align-items: center;

	span {
		padding-top: 4px;
	}

	img {
		margin-right: 10px;
	}
`;

const ListErrors = styled.ul`
	margin-top: 5px;
	margin-bottom: 5px;
	li {
		color: ${theme.engError};
	}
`;

function EngageFormErrors({ errors }) {
	if (!errors || _.isEmpty(errors)) {
		return <div />;
	}

	return (
		<Container>
			<Title>
				<img src={WarningIcon} alt="" />
				<span>
					<b>Whoops!</b> There were some problems with your input
				</span>
			</Title>
			<ListErrors>
				{_.map(errors, (value, key) => (
					<li key={key}>{value.value ? value.value : value} </li>
				))}
			</ListErrors>
		</Container>
	);
}

EngageFormErrors.propTypes = {
	errors: PropTypes.any,
};

export default React.memo(EngageFormErrors);
