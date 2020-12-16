/* eslint-disable react/prop-types */
import React from 'react';
import NumberFormat from 'react-number-format';
import classnames from 'classnames';
import { FormGroup, Label } from 'reactstrap';

function EngagePercentageInput({ title, name, onChange, value, disabled, required }) {
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
				thousandSeparator=","
				placeholder="% here"
				className="form-control"
				suffix="%"
				onValueChange={event => {
					onChange(event.floatValue);
				}}
			/>
		</FormGroup>
	);
}

export default EngagePercentageInput;
