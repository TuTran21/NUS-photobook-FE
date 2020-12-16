/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classnames from 'classnames';
import NumberFormat from 'react-number-format';

const Label = styled.label`
    display: inline-block;
    margin-bottom: 0 !important;
    cursor: pointer;
    line-height: 1.5;
    font-family: 'Nunito',Helvetica,Arial,sans-serif;
    font-size: 16px;
}`;

const FormGroup = styled.div``;

export default React.memo(({ title, value, name, onChange, required, disabled, currencyLabel }) => (
	<FormGroup className="eng-input--primary">
		<Label
			className={classnames('eng-label--input-title', {
				'eng-label--required': required,
			})}
		>
			{title}
		</Label>

		<NumberFormat
			value={value}
			name={name}
			disabled={disabled}
			thousandSeparator=","
			placeholder={currencyLabel ? `${currencyLabel} here` : '$ here'}
			className="form-control"
			prefix={currencyLabel || '$'}
			onValueChange={event => {
				onChange(event.floatValue);
			}}
		/>
	</FormGroup>
));
