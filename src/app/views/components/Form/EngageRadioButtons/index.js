/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import theme from 'app/themes/styles';
import _ from 'lodash';
import classnames from 'classnames';
import UnChecked from './UnChecked.svg';
import Checked from './Checked.svg';

import { incrementAlphabet } from 'utils/utils';
import QuestionNumber from '../../Photo/QuestionNumber';
import UnCheckedSquare from './UnCheckedSquare.svg';
import CheckedSquare from './CheckedSquare.svg';
import LoadingIndicator from '../../common/LoadingIndicator';

const Wrapper = styled.div`
	display: flex;
	margin-bottom: 10px;

	${props => (props.flexvertical ? `flex-direction: column;` : '')}

	${props =>
		props.disabled
			? `
      background-color: ${theme.engDisabledBackground};
      border: none !important;
      cursor: not-allowed !important;
      opacity: 0.9;
  `
			: ''}
`;

const Label = styled.label`
    display: inline-block;
    margin-bottom: 0 !important;
    cursor: pointer;
    line-height: 1.5;
    font-size: 16px;
}`;

const StyledCheckbox = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	cursor: pointer;
	margin-right: 20px;
	height: 36px;
	margin-bottom: 8px;

	label {
		margin-bottom: 0 !important;
		margin-left: 5px;
		color: ${theme.ncpDark};
		cursor: pointer;
	}

	img {
		cursor: pointer;
		margin-top: -1px;
		width: 16px;
	}
`;

export default function({
	title,
	required,
	defaultValue,
	onChange,
	isMulti = false,
	disabled,
	flexvertical,
	holderStyle,
	hasAlphabetLabel,
	value,
	options = [],
}) {
	const [selected, setSelected] = useState(defaultValue || (isMulti ? [] : {}));

	const onSelect = useCallback(
		radioButton => {
			if (disabled) {
				return;
			}

			if (isMulti) {
				const isExistedIdx = _.findIndex(selected, sel => sel.key === radioButton.key);
				if (isExistedIdx > -1) {
					const newSelected = [...selected];
					newSelected.splice(isExistedIdx, 1);
					setSelected(newSelected);
					onChange(newSelected);
				} else {
					setSelected([...selected, radioButton]);
					onChange([...selected, radioButton]);
				}
			} else if (_.isEmpty(selected) || selected.key !== radioButton.key) {
				setSelected(radioButton);
				onChange(radioButton);
			} else {
				setSelected({});
				onChange(null);
			}
		},
		[selected, setSelected, onChange, disabled],
	);

	const isSelected = key => {
		if (_.isEmpty(selected)) {
			return false;
		}

		if (isMulti) {
			return !!_.find(selected, sel => sel.key === key);
		}

		return selected.key === key;
	};

	const isUnselected = key => {
		if (_.isEmpty(selected)) {
			return true;
		}

		if (isMulti) {
			return !_.find(selected, sel => sel.key === key);
		}

		return selected.key !== key;
	};

	return (
		<React.Fragment>
			{!!title && (
				<Label
					className={classnames('eng-label--input-title', {
						'eng-label--required': required,
					})}
				>
					{title}
				</Label>
			)}

			<Wrapper style={holderStyle} disabled={disabled} flexvertical={flexvertical}>
				{options.map((radioButton, idx) => (
					<StyledCheckbox key={idx} onClick={() => onSelect(radioButton)}>
						{hasAlphabetLabel && <QuestionNumber hasAlphabet>{incrementAlphabet(idx)}</QuestionNumber>}
						{isSelected(radioButton.key) && <img src={isMulti ? CheckedSquare : Checked} alt="" />}
						{isUnselected(radioButton.key) && <img src={isMulti ? UnCheckedSquare : UnChecked} alt="" />}
						<Label>{` ${radioButton.label}`}</Label>
					</StyledCheckbox>
				))}
			</Wrapper>
		</React.Fragment>
	);
}
