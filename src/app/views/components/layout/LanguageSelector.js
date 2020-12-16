import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import HeaderDropdownToggle from './CustomDropdowns/HeaderDropdownToggle';
import { actions } from 'state/ducks/i18n/index';

const languages = [
	{
		lang: 'en',
		name: 'English',
		flag:
			'https://res.cloudinary.com/doyyjeich/image/upload/v1598253999/onlineExam/assets/flags/226-united-states_lg4ygv.svg',
	},
	{
		lang: 'vi',
		name: 'Vietnamese',
		flag:
			'https://res.cloudinary.com/doyyjeich/image/upload/v1598253941/onlineExam/assets/flags/220-vietnam_gyyd9c.svg',
	},
];

class LanguageSelector extends React.Component {
	render() {
		const { lang, iconType, setLanguage } = this.props;
		// const currentLanguage = languages.find(x => x.lang === lang);

		return (
			<Dropdown className="kt-header__topbar-item kt-header__topbar-item--langs" drop="down" alignRight>
				<Dropdown.Toggle as={HeaderDropdownToggle} id="dropdown-toggle-my-cart">
					<span
						className={clsx('kt-header__topbar-icon', {
							'kt-header__topbar-icon--brand': iconType === 'brand',
						})}
					>
						<img src={lang.flag} alt={lang.name} />
					</span>
				</Dropdown.Toggle>
				<Dropdown.Menu className="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround">
					<ul className="kt-nav kt-margin-t-10 kt-margin-b-10">
						{languages.map(language => (
							<li
								key={language.lang}
								className={clsx('kt-nav__item', {
									'kt-nav__item--active': language.lang === lang.lang,
								})}
							>
								<span
									onClick={() => {
										setLanguage(language);
										this.setState({ open: false });
										// setTimeout(() => window.location.reload(), 400);
									}}
									className={clsx('kt-nav__link', {
										'kt-nav__link--active': language.lang === lang.lang,
									})}
								>
									<span className="kt-nav__link-icon">
										<img src={language.flag} alt={language.name} />
									</span>
									<span className="kt-nav__link-text">{language.name}</span>
								</span>
							</li>
						))}
					</ul>
				</Dropdown.Menu>
			</Dropdown>
		);
	}
}

const mapStateToProps = ({ i18n }) => ({ lang: i18n.lang });

export default connect(mapStateToProps, actions)(LanguageSelector);
