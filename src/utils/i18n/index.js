import React from 'react';
import { useSelector } from 'react-redux';
import { addLocaleData, IntlProvider } from 'react-intl';

import * as de from 'react-intl/locale-data/de';
import * as en from 'react-intl/locale-data/en';
import * as es from 'react-intl/locale-data/es';
import * as fr from 'react-intl/locale-data/fr';
import * as ja from 'react-intl/locale-data/ja';
import * as zh from 'react-intl/locale-data/zh';
import * as vi from 'react-intl/locale-data/vi';

import deMessages from './messages/de';
import viMessages from './messages/vi';
import enMessages from './messages/en';
import esMessages from './messages/es';
import frMessages from './messages/fr';
import jaMessages from './messages/ja';
import zhMessages from './messages/zh';

const allMessages = {
	de: deMessages,
	en: enMessages,
	vi: viMessages,
	es: esMessages,
	fr: frMessages,
	ja: jaMessages,
	zh: zhMessages,
};

addLocaleData([...de, ...en, ...es, ...fr, ...ja, ...zh, ...vi]);

export default function I18nProvider({ children }) {
	const locale = useSelector(({ i18n }) => i18n.lang.lang);
	const messages = allMessages[locale];

	return (
		<IntlProvider locale={locale} messages={messages}>
			{children}
		</IntlProvider>
	);
}

// HOW TO USE
// import { FormattedMessage, injectIntl } from 'react-intl';
// <FormattedMessage id="AUTH.LOGIN.TITLE" />
// export default injectIntl(connect(null, auth.actions)(Login));
