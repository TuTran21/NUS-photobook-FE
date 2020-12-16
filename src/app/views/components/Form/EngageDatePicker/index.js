/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import DatePicker from 'react-datepicker';
import classnames from 'classnames';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import CalendarIcon from './CalendarIcon.svg';

const Label = styled.label`
    display: inline-block;
    margin-bottom: 0 !important;
    cursor: pointer;
    line-height: 1.5;
    font-family: 'Nunito',Helvetica,Arial,sans-serif;
    font-size: 16px;
}`;

const FormGroup = styled.div``;

function EngageDatePicker({
	title,
	errors,
	onChange,
	value,
	name,
	required,
	disabled,
	minDate,
	placeholder,
	isClearable,
	showMonthYearPicker,
	...restProps
}) {
	return (
		<FormGroup className="eng-input--primary">
			<Label
				className={classnames('eng-label--input-title', {
					'eng-label--required': required,
				})}
			>
				{title}
			</Label>
			<DatePicker
				name={name}
				id={name}
				dateFormat="dd-MM-yyyy"
				className="form-control"
				selected={value}
				placeholderText={placeholder || 'Choose an option'}
				onChange={onChange}
				disabled={disabled}
				minDate={minDate ? moment(minDate).toDate() : moment().toDate()}
				isClearable={isClearable && !disabled}
				showMonthYearPicker={showMonthYearPicker}
				{...restProps}
			/>

			<img src={CalendarIcon} alt="" />
		</FormGroup>
	);
}

EngageDatePicker.defaultProps = {
	showMonthYearPicker: false,
};

export default React.memo(EngageDatePicker);
