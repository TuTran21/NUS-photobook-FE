/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import _ from 'lodash';
import React, { useCallback } from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import { FormGroup, Input, Label } from 'reactstrap';

const StyledFormGroup = styled(FormGroup)`
	position: relative;

	&.bordered .form-control {
		margin-top: 5px;
	}

	.form-control {
		resize: none;
	}
`;

const FloatLabel = styled(Label)`
	position: absolute;
	right: 0;
	top: 0;

	/* &.bordered {
    top: -20px;
  } */
`;

const StyledInput = styled(Input)`
	${props =>
		props.rows &&
		`
    height: ${props.rows * 21 + 10}px !important;
  `}
`;

function EngageTextarea({ errors, title, required, maxLength = 500, value = '', rows, bordered, ...restProps }) {
	const getRemainingCharacters = useCallback(() => maxLength - _.get(value, 'length', 0), [value]);

	const remainingChars = getRemainingCharacters();
	return (
		<StyledFormGroup
			className={classnames('eng-input--primary', {
				bordered: bordered && !title,
			})}
		>
			{maxLength !== Infinity && (
				<FloatLabel
					className={classnames('eng-label--input-title', {
						bordered: bordered && !title,
					})}
				>
					{remainingChars} character
					<span>{remainingChars > 1 ? 's' : ''}</span> remaining
				</FloatLabel>
			)}
			{!!title && (
				<Label
					className={classnames('eng-label--input-title', {
						'eng-label--required': required,
					})}
				>
					{title}
				</Label>
			)}
			<StyledInput
				className={classnames({
					bordered,
				})}
				rows={rows}
				type="textarea"
				name="email"
				value={value}
				maxLength={maxLength}
				{...restProps}
			/>
		</StyledFormGroup>
	);
}

EngageTextarea.propTypes = {
	errors: PropTypes.any,
	title: PropTypes.any,
	value: PropTypes.any,
	required: PropTypes.any,
	maxLength: PropTypes.number,
	rows: PropTypes.number,
	bordered: PropTypes.bool,
};

EngageTextarea.defaultProps = { rows: 4, bordered: false };

export default EngageTextarea;
