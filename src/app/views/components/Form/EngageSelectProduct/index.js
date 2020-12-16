/* eslint-disable react/prop-types */
/* eslint-disable global-require */
import React, { useState } from 'react';
import _ from 'lodash';
import { Label, Button } from 'reactstrap';
import styled from 'styled-components';
import './styles.scss';
import EngageTagSelect from 'components/Form/EngageTagSelect';
import classnames from 'classnames';

import Checked from './Checked.svg';
import UnChecked from './UnChecked.svg';
import Down from './Down.svg';
import Up from './Up.svg';

const StyledButton = styled(Button)`
	${props =>
		props.isDisabled &&
		`
    background-color: #F7F7F7 !important;
    border: none !important;
    cursor: not-allowed !important;
    opacity: 0.9;
  `}
`;

const StyledLabel = styled(Label)`
	margin-bottom: 10px;
`;

function EngageSelectProductBuySell({ required, disabled, value, onChange, title, allProducts, label }) {
	const [show, setShow] = useState(false);

	return (
		<React.Fragment>
			{!!label && (
				<StyledLabel
					htmlFor={title}
					className={classnames('eng-label--input-title', {
						'eng-label--required': required,
					})}
				>
					{label}
				</StyledLabel>
			)}
			<div className="egg-campaign-select-product">
				<StyledButton isDisabled={disabled} className="btn btn-secondary" onClick={() => setShow(!show)}>
					<span>
						<img alt="" src={_.get(value, 'length') ? Checked : UnChecked} />
						<span>{title}</span>
					</span>
					<img alt="" src={show ? Up : Down} />
				</StyledButton>

				{show && (
					<EngageTagSelect
						defaultValue={value}
						options={allProducts}
						disabled={disabled}
						onChange={onChange}
					/>
				)}
			</div>
		</React.Fragment>
	);
}

export default React.memo(EngageSelectProductBuySell);
