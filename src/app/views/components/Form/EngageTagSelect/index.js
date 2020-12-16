/* eslint-disable react/no-unused-prop-types */
/* eslint-disable indent */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import theme from 'utils/theme';
import classnames from 'classnames';

import { FormGroup, Label, Input } from 'reactstrap';
import _ from 'lodash';
import styled from 'styled-components';
import CloseIcon from './CloseIcon.svg';
import SearchIcon from './SearchIcon.svg';
import PlusIcon from './PlusIcon.svg';
import PlusIconActive from './PlusIconActive.svg';

const SelectedTags = styled.div`
	margin: 15px 0;
	margin-bottom: 10px;
	button {
		background-color: ${theme.engLineColor};
		border: 1px solid rgba(194, 207, 224, 0.8);
		border-radius: 5px;
		height: 25px;
		padding: 2px 4px;
		padding-right: 20px;
		font-size: 14px;
		color: ${theme.engDarkSec};
		position: relative;
		margin-right: 5px;
		margin-bottom: 5px;
		cursor: pointer !important;

		&:hover {
			background-color: ${theme.engPrimaryLight};
			border-color: ${theme.engPrimary};
		}

		img {
			position: absolute;
			top: 7px;
			right: 6px;
		}

		span {
			text-overflow: ellipsis;
			max-width: 470px;
			display: block;
			white-space: nowrap;
			overflow: hidden;
		}
	}
`;

const ListTags = styled.div`
	max-height: 200px;
	overflow-y: scroll;
	border: 1px solid ${theme.engInputBorderColor};
	border-top: none;
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;

	&:empty {
		border: none;
	}

	${props =>
		props.disabled
			? `
      background-color: ${theme.engDisabledBackground};
      cursor: not-allowed !important;
      opacity: 0.9;
  `
			: ''}
`;

const Tag = styled.div`
	height: 50px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 4px 20px;
	color: ${theme.engDarkSec};
	border-bottom: 1px solid ${theme.engInputBorderColor};
	cursor: pointer;

	&:hover {
		background-color: ${theme.engPrimaryLight};
	}

	span {
		max-width: 400px;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
		overflow: hidden;
	}
`;

const SearchBox = styled.div`
	position: relative;
	img {
		position: absolute;
		left: 12px;
		top: 15px;
	}

	.form-control {
		background: ${theme.engInputLightBg};
		box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.2);
		border-radius: 3px 3px 0px 0px;
		padding-left: 30px;
		color: ${theme.engDarkSec};
		border: 1px solid ${theme.engInputBorderColor};
		height: 41px;

		&::placeholder {
			color: ${theme.engDarkSec};
			font-style: italic;
		}

		&:disabled {
			background-color: ${theme.engDisabledBackground};
			border: none !important;
			cursor: not-allowed !important;
			opacity: 0.9;
		}

		&:focus {
			background: ${theme.engInputLightBg};
			box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.2);
			border-radius: 3px 3px 0px 0px;
			padding-left: 30px;
			border: 1px solid ${theme.engInputBorderColor};
			outline: none;
		}
	}
`;

function EngageTagSelect({ options, disabled, defaultValue, onChange, required, title }) {
	const [keyword, setKeyword] = useState();
	const [selected, setSelected] = useState(defaultValue || []);

	const filterOptions = useCallback(() => {
		if (!_.trim(keyword)) {
			return options;
		}
		return _.filter(options, option => _.toLower(_.get(option, 'name') || '').indexOf(_.toLower(keyword)) >= 0);
	}, [keyword, options]);

	const isSelected = useCallback(option => _.find(selected, inSelected => inSelected.id === option.id), [selected]);

	const onSelect = useCallback(
		option => {
			if (disabled) {
				return;
			}

			if (isSelected(option)) {
				const remainingOptions = _.filter(selected, inSelected => inSelected.id !== option.id);

				onChange(remainingOptions);
				setSelected(remainingOptions);
			} else {
				const newSelectedOptions = [...selected, option];
				setSelected(newSelectedOptions);
				onChange(newSelectedOptions);
			}
		},
		[selected, options],
	);

	return (
		<FormGroup>
			{!!title && (
				<Label
					className={classnames('eng-label--input-title', {
						'eng-label--required': required,
					})}
				>
					{title}
				</Label>
			)}
			<SelectedTags>
				{_.map(selected, option => (
					<button type="button" key={option.id} onClick={() => onSelect(option)}>
						<span>{option.name}</span>
						<img src={CloseIcon} alt="" />
					</button>
				))}
			</SelectedTags>
			<SearchBox>
				<img src={SearchIcon} alt="" />
				<Input
					placeholder="Type to search..."
					disabled={disabled}
					type="text"
					value={keyword}
					onChange={event => setKeyword(_.get(event, 'target.value'))}
				/>
			</SearchBox>
			<ListTags disabled={disabled}>
				{_.map(filterOptions(), option => (
					<Tag key={option.id} onClick={() => onSelect(option)}>
						<span>{option.name}</span>
						{isSelected(option) && <img src={PlusIconActive} alt="" />}
						{!isSelected(option) && <img src={PlusIcon} alt="" />}
					</Tag>
				))}
			</ListTags>
		</FormGroup>
	);
}

EngageTagSelect.propTypes = {
	errors: PropTypes.any,
	options: PropTypes.any,
	value: PropTypes.any,
	onChange: PropTypes.func,
};

export default EngageTagSelect;
