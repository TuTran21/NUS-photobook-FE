import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { HelmetProvider } from 'react-helmet-async';
import ThemeProvider from 'app/themes/materialUI/ThemeProvider';
import I18nProvider from 'utils/i18n';
import { ApolloProvider } from '@apollo/client';
import client from 'utils/apollo';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
// Components
import App from './app/views/App';
import { SnackbarProvider } from 'notistack';
// Store
import configureStore from './state/store';
import history from './utils/history';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
// IE 11 polyfills
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
// Actions
// Styling
import 'app/themes/styles/index.scss';
import 'socicon/css/socicon.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { CircularProgress } from '@material-ui/core';
// Create redux store with history
const store = configureStore(window.REDUX_INITIAL_DATA, history);
const persistor = persistStore(store);

render(
	<>
		<ApolloProvider client={client}>
			<Provider store={store}>
				<React.Suspense fallback={<CircularProgress></CircularProgress>}>
					<I18nProvider>
						<HelmetProvider>
							<PersistGate persistor={persistor}>
								<ThemeProvider>
									<ConnectedRouter history={history}>
										<SnackbarProvider>
											<MuiPickersUtilsProvider utils={MomentUtils}>
												<App />
											</MuiPickersUtilsProvider>
										</SnackbarProvider>
									</ConnectedRouter>
								</ThemeProvider>
							</PersistGate>
						</HelmetProvider>
					</I18nProvider>
				</React.Suspense>
			</Provider>
		</ApolloProvider>
	</>,
	document.getElementById('root'),
);

{
	/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */
}
