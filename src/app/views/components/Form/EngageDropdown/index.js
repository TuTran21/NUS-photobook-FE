import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import Select, { components } from 'react-select';
// import SearchIcon from 'component\s/EngageIcons/SearchIcon';
import ArrowIcon from './Arrow.svg';

const Label = styled.label`
    display: inline-block;
    margin-bottom: 0 !important;
    cursor: pointer;
    line-height: 1.5;
    font-family: 'Nunito',Helvetica,Arial,sans-serif;
    font-size: 16px;
}`;

const FormGroupStyled = styled.div`
	margin-bottom: 0px;
	min-width: 130px;
	display: inline-block;
`;

/**
 *
 * @param {*} props { data,  }
 */
const DropdownIndicator = props => (
	<components.DropdownIndicator {...props}>
		<img alt="" src={ArrowIcon} />
	</components.DropdownIndicator>
);

const StyledSelect = styled(Select)``;

const EngageDropdown = React.memo(
	({
		title,
		errors,
		required,
		disabled,
		isClearable = false,
		placeholder,
		holderStyle,
		value,
		key,
		...restProps
	}) => (
		<FormGroupStyled style={holderStyle} className={errors ? 'errors' : ''}>
			{!!title && (
				<Label
					htmlFor={title}
					className={classnames('eng-label--input-title', {
						'eng-label--required': required,
					})}
				>
					{title}
				</Label>
			)}
			<StyledSelect
				key={key}
				value={value}
				className="eng-select--primary"
				classNamePrefix="eng-select--primary"
				styles={{
					placeholder: () => ({
						color: 'rgba(48, 51, 66, 0.8)',
					}),
				}}
				// menuIsOpen
				components={{ DropdownIndicator }}
				isClearable={isClearable && !disabled}
				placeholder={placeholder || 'Choose an option'}
				{...restProps}
				isDisabled={disabled}
			/>
		</FormGroupStyled>
	),
);

EngageDropdown.propTypes = {
	errors: PropTypes.any,
	title: PropTypes.any,
	required: PropTypes.any,
	labelClassName: PropTypes.any,
	selectClassName: PropTypes.any,
	isClearable: PropTypes.any,
	disabled: PropTypes.any,
	placeholder: PropTypes.any,
};
export default EngageDropdown;
