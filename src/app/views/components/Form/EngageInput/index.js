/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import theme from 'app/themes/styles';

const StyledFormGroup = styled.div`
	margin-bottom: 10px;
	&.errors.form-group {
		margin-bottom: 0px !important;
	}
	width: ${props => (props.width ? props.width : 'auto')};
`;

const Label = styled.label`
    display: inline-block;
    margin-bottom: 0 !important;
    cursor: pointer;
    line-height: 1.5;
    font-family: 'Nunito',Helvetica,Arial,sans-serif;
    font-size: 16px;
}`;

const StyledLabel = styled(Label)`
	font-size: 14px;
`;

const StyledError = styled(Label)`
	font-size: 14px;
	color: ${theme.ncpRed};
	float: right;
`;

const Input = styled.input`
	display: block;
	width: 100%;
	height: calc(1.5em + 0.75rem + 2px);
	padding: 0.375rem 0.75rem;
	font-size: 1rem;
	font-weight: 400;
	line-height: 1.5;
	color: #495057;
	background-color: ${theme.ncpWhite};
	background-clip: padding-box;
	border: 1px solid #ced4da;
	border-radius: 0.25rem;

	:focus {
		color: #495057;
		background-color: #fff;
		border-color: #80bdff;
		outline: 0;
		-webkit-box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
		box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
	}
`;

const StyledInput = styled(Input)`
	${props => (props.errormessage ? `border: 1px solid ${theme.ncpRed};` : '')}
`;

function EngageInput({
	errors,
	title,
	required,
	value,
	maxLength,
	width,
	holderStyle,
	onChange,
	name,
	errorMessage,
	...restProps
}) {
	return (
		<StyledFormGroup
			width={width}
			className={classnames('eng-input--primary', {
				errors: !!errors,
			})}
			style={holderStyle}
		>
			{!!title && (
				<StyledLabel
					className={classnames('eng-label--input-title', {
						'eng-label--required': required,
					})}
				>
					{title}
				</StyledLabel>
			)}
			{errorMessage && <StyledError>{errorMessage}</StyledError>}
			<StyledInput
				name={name || 'email'}
				type="text"
				value={value || undefined}
				maxLength={maxLength || '100'}
				onChange={e => onChange(e)}
				errormessage={errorMessage}
				{...restProps}
			/>
		</StyledFormGroup>
	);
}

EngageInput.propTypes = {
	errors: PropTypes.any,
	title: PropTypes.any,
	value: PropTypes.any,
	required: PropTypes.any,
	maxLength: PropTypes.any,
};

export default EngageInput;
