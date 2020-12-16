/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from 'utils/theme';

import ToggleIcon from './ToggleIcon.svg';

const StyledToggleButton = styled.button`
	transition: 0.3s;
	width: 67px;
	height: 30px;
	display: flex;
	align-items: center;
	border-radius: 15px;
	background-color: ${props => (props.isActive ? theme.engPrimary : theme.engDark)};
	color: #fff;
	font-size: 13px;
	padding: 0;
	justify-content: space-between;
	outline: none;
	border: none !important;

	img {
		height: 33px;
		padding-top: 2px;
	}

	span {
		height: 30px;
		display: flex;
		align-items: center;
		padding: 0;
		padding-left: ${props => (props.isActive ? '15px' : 0)};
		padding-right: ${props => (props.isActive ? 0 : '15px')};
		padding-bottom: 3px;
	}

	&:focus {
		outline: none;
	}
`;

function EngageSwitchYesNo({ onToggle, defaultValue = false }) {
	const [isActive, setIsActive] = useState(defaultValue);
	useEffect(() => {
		setIsActive(defaultValue);
	}, [defaultValue]);

	return (
		<StyledToggleButton
			isActive={isActive}
			onClick={() => {
				onToggle(!isActive);
				setIsActive(!isActive);
			}}
		>
			{!isActive ? <img src={ToggleIcon} alt="" /> : ''}
			<span>{isActive ? 'YES' : 'NO'}</span>
			{isActive ? <img src={ToggleIcon} alt="" /> : ''}
		</StyledToggleButton>
	);
}

EngageSwitchYesNo.propTypes = {
	onToggle: PropTypes.func,
	defaultValue: PropTypes.bool,
};

export default EngageSwitchYesNo;
