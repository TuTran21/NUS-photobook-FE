/* eslint-disable react/prop-types */
/* eslint-disable global-require */
import React, { useState } from 'react';
import _ from 'lodash';
import { Label, Col, Button } from 'reactstrap';
import styled from 'styled-components';
import classnames from 'classnames';
import './styles.scss';
import EngageTagSelect from 'components/Form/EngageTagSelect';
import Checked from './Checked.svg';
import UnChecked from './UnChecked.svg';

const StyledLabel = styled(Label)`
	margin-bottom: 10px;
`;

function EngageSelectProductBuySell({
	required,
	disabled,
	buyValue,
	sellValue,
	onChangeBuy,
	onChangeSell,
	allProducts,
}) {
	const [buy, setBuy] = useState(false);
	const [sell, setSell] = useState(false);

	return (
		<React.Fragment>
			<Col xs={12} className="egg-campaign-select-product">
				<StyledLabel
					htmlFor="select-product-to"
					className={classnames('eng-label--input-title', {
						'eng-label--required': required,
					})}
				>
					Select products
				</StyledLabel>
				<Button className="btn btn-secondary" onClick={() => setBuy(!buy)}>
					<span>
						<img alt="" src={_.get(buyValue, 'length') ? Checked : UnChecked} />
						<span>BUY</span>
					</span>
					<i className="icon-arrow-down" />
				</Button>

				{buy && (
					<EngageTagSelect
						title=" "
						defaultValue={buyValue}
						options={allProducts}
						disabled={disabled}
						onChange={onChangeBuy}
					/>
				)}
			</Col>

			<Col xs={12} className="egg-campaign-select-product">
				<Button className="btn btn-secondary" onClick={() => setSell(!sell)}>
					<span>
						<img alt="" src={_.get(sellValue, 'length') ? Checked : UnChecked} />
						<span>SELL</span>
					</span>
					<i className="icon-arrow-down" />
				</Button>

				{sell && (
					<EngageTagSelect
						title=" "
						defaultValue={sellValue}
						options={allProducts}
						disabled={disabled}
						onChange={onChangeSell}
					/>
				)}
			</Col>
		</React.Fragment>
	);
}

export default React.memo(EngageSelectProductBuySell);
