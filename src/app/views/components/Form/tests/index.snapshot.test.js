import React from 'react';
import moment from 'moment';
import EngageCheckbox from 'components/Form/EngageCheckbox';
import EngageCurrencyInput from 'components/Form/EngageCurrencyInput';
import EngageDatePicker from 'components/Form/EngageDatePicker';
import EngageDropdown from 'components/Form/EngageDropdown';
// import EngageEditor from 'components/Form/EngageEditor';
import EngageFormErrors from 'components/Form/EngageFormErrors';
import EngageInput from 'components/Form/EngageInput';
import EngagePercentageInput from 'components/Form/EngagePercentageInput';
import EngageRadioButtons from 'components/Form/EngageRadioButtons';
import EngageSwitchYesNo from 'components/Form/EngageSwitchYesNo';
import EngageTagSelect from 'components/Form/EngageTagSelect';
import EngageTextarea from 'components/Form/EngageTextarea';

import renderer from 'react-test-renderer';

describe('components/Form', () => {
	it('EngageCheckbox should match snapshot', () => {
		const container = renderer
			.create(<EngageCheckbox disabled isChecked title="EngageCheckbox title" onChange={() => {}} />)
			.toJSON();

		expect(container).toMatchSnapshot();
	});

	it('EngageCurrencyInput should match snapshot', () => {
		const container = renderer
			.create(
				<EngageCurrencyInput
					required
					disabled
					currencyLabel="$"
					title="EngageCurrencyInput Title"
					value="100"
					name="EngageCurrencyInput_name"
					onChange={() => {}}
				/>,
			)
			.toJSON();

		expect(container).toMatchSnapshot();
	});

	it('EngageDatePicker should match snapshot', () => {
		const container = renderer
			.create(
				<EngageDatePicker
					required
					isClearable
					disabled
					title="EngageDatePicker__title"
					value={moment().toDate()}
					onChange={() => {}}
					minDate={moment().toDate()}
					maxDate={moment().toDate()}
				/>,
			)
			.toJSON();

		expect(container).toMatchSnapshot();
	});

	it('EngageDropdown should match snapshot', () => {
		const container = renderer
			.create(
				<EngageDropdown
					required
					disabled
					isClearable
					title="EngageDropdown__tite"
					value={undefined}
					onChange={() => {}}
					placeholder="EngageDropdown__placeholder"
					options={[]}
				/>,
			)
			.toJSON();

		expect(container).toMatchSnapshot();
	});

	it('EngageFormErrors should match snapshot', () => {
		const container = renderer
			.create(
				<EngageFormErrors
					errors={{
						error1: 'Error row 1',
						error2: 'Error row 2',
					}}
				/>,
			)
			.toJSON();

		expect(container).toMatchSnapshot();
	});

	it('EngageInput should match snapshot', () => {
		const container = renderer
			.create(
				<EngageInput
					required
					title="Last name"
					type="text"
					placeholder="Enter last name"
					value="EngageInput__value"
					onChange={() => {}}
				/>,
			)
			.toJSON();

		expect(container).toMatchSnapshot();
	});

	it('EngagePercentageInput should match snapshot', () => {
		const container = renderer
			.create(
				<EngagePercentageInput
					required
					disabled
					title="Sales fee"
					value="EngagePercentageInput__value"
					name="sales_charge"
					onChange={() => {}}
				/>,
			)
			.toJSON();

		expect(container).toMatchSnapshot();
	});

	it('EngageRadioButtons should match snapshot', () => {
		const container = renderer
			.create(
				<EngageRadioButtons
					required
					disabled
					title="Client restrictions"
					defaultValue={undefined}
					onChange={() => {}}
					options={[]}
				/>,
			)
			.toJSON();

		expect(container).toMatchSnapshot();
	});

	it('EngageSwitchYesNo should match snapshot', () => {
		const container = renderer.create(<EngageSwitchYesNo onToggle={() => {}} defaultValue />).toJSON();

		expect(container).toMatchSnapshot();
	});

	it('EngageTagSelect should match snapshot', () => {
		const container = renderer
			.create(
				<EngageTagSelect required disabled title="Tags" defaultValue={[]} options={[]} onChange={() => {}} />,
			)
			.toJSON();

		expect(container).toMatchSnapshot();
	});

	it('EngageTextarea should match snapshot', () => {
		const container = renderer
			.create(
				<EngageTextarea
					disabled
					title="External full description"
					placeholder=""
					rows={3}
					maxLength={300}
					name="description"
					value="EngageTextarea__description"
					onChange={() => {}}
				/>,
			)
			.toJSON();

		expect(container).toMatchSnapshot();
	});
});
