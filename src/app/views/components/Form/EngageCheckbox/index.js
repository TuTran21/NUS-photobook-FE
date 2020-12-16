/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import theme from 'app/themes/styles';
import UnChecked from './UnChecked.svg';
import Checked from './Checked.svg';

const StyledCheckbox = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	cursor: pointer;
	margin-bottom: 0px;

	label {
		margin-bottom: 0 !important;
		margin-left: 5px;
		color: ${theme.ncpDark};
		cursor: pointer;
	}

	img {
		margin-top: -1px;
		cursor: pointer;
	}

	${props =>
		props.disabled
			? `
	  background-color: ${theme.ncpDisabledBackground};
	  padding: 5px 10px;
      border: none !important;
      opacity: 0.9;
  `
			: ''}
`;

const Label = styled.label`
    display: inline-block;
    margin-bottom: 0 !important;
    margin-left: 5px;
    cursor: pointer;
    line-height: 1.5;
    font-size: 16px;
}`;

export default function({ title, isChecked, onChange, disabled }) {
	const [checked, setChecked] = useState(isChecked);
	useEffect(() => {
		setChecked(isChecked);
	}, [isChecked]);

	const onCheck = useCallback(() => {
		if (disabled) {
			return;
		}
		setChecked(!checked);
		onChange(!checked);
	}, [checked, setChecked, onChange, disabled]);

	return (
		<StyledCheckbox onClick={onCheck} disabled={disabled}>
			{checked && <img src={Checked} alt="" />}
			{!checked && <img src={UnChecked} alt="" />}
			<Label>{` ${title}`}</Label>
		</StyledCheckbox>
	);
}
