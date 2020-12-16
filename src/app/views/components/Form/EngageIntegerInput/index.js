/* eslint-disable react/prop-types */
import React from 'react';
import NumberFormat from 'react-number-format';
import classnames from 'classnames';
import { FormGroup, Label } from 'reactstrap';
import _ from 'lodash';

function EngageIntegerInput({ title, name, onChange, value, disabled, required, suffix }) {
	return (
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
				decimalSeparator={false}
				thousandSeparator=","
				placeholder={`Type ${_.toLower(suffix)} here`}
				className="form-control"
				suffix={` ${_.toLower(suffix)}`}
				onValueChange={event => {
					onChange(event.floatValue);
				}}
			/>
		</FormGroup>
	);
}

export default EngageIntegerInput;
