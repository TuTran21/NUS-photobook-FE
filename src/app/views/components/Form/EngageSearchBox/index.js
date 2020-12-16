/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Input } from 'reactstrap';

import SearchIcon from './SearchIcon.svg';

const InputWrapper = styled.div`
	position: relative;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 10;

	img {
		position: absolute;
		left: 10px;
	}

	input {
		outline: none;

		&:focus {
			border-color: none;
		}

		&::placeholder {
			font-size: 14px;
			line-height: 17px;

			color: #303342;

			opacity: 0.6;
		}
	}
`;

function EngageSearchBox({ errors, title, required, value, ...restProps }) {
	return (
		<InputWrapper className="eng-input--search-box">
			<img src={SearchIcon} alt="" />
			<Input
				name="search_text"
				type="text"
				value={value || undefined}
				placeholder="Type to search"
				{...restProps}
			/>
		</InputWrapper>
	);
}

EngageSearchBox.propTypes = {
	errors: PropTypes.any,
	title: PropTypes.any,
	value: PropTypes.any,
	required: PropTypes.any,
};

export default EngageSearchBox;
