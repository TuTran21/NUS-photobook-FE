import { ApolloClient, InMemoryCache, ApolloLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { HttpLink } from '@apollo/client/link/http';
import { WebSocketLink } from '@apollo/client/link/ws';
import { onError } from '@apollo/client/link/error';
import { signOut } from './authentication';
import history from './history';

const httpLink = new HttpLink({
	uri: process.env.GRAPHQL_SERVER ? process.env.GRAPHQL_SERVER : 'http://localhost:5000/graphql',
});

const wsLink = new WebSocketLink({
	uri: process.env.GRAPHQL_SERVER_SOCKET
		? process.env.GRAPHQL_SERVER_SOCKET
		: 'wss://online-test-tu-tran-be.herokuapp.com/graphql',
	options: {
		reconnect: false,
	},
});

const terminatingLink = split(
	({ query }) => {
		const { kind, operation } = getMainDefinition(query);
		return kind === 'OperationDefinition' && operation === 'subscription';
	},
	wsLink,
	httpLink,
);

const authLink = new ApolloLink((operation, forward) => {
	operation.setContext(({ headers = {} }) => {
		const token = localStorage.getItem('accessToken');

		if (token) {
			headers = { ...headers, xToken: token };
		}
		return { headers };
	});

	return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.forEach(({ message, locations, path }) => {
			if (message === 'Unauthenticated' || message == 'Your session has expired, please login again.') {
				signOut();
			}

			if (message === 'Forbidden' || message === 'Unauthorized') {
				history.push('/403');
			}
		});
	}

	// if (networkError) {
	// 	if (networkError.statusCode === 401) {
	// 		signOut();
	// 	}
	// }
});

const link = ApolloLink.from([authLink, errorLink, terminatingLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
	link,
	cache,
	defaultOptions: {
		watchQuery: {
			errorPolicy: 'none',
		},
		query: {
			errorPolicy: 'none',
		},
		mutate: {
			errorPolicy: 'none',
		},
	},
});

// const client = new ApolloClient({
//   uri: "http://localhost:5000/graphql",
//   cache: new InMemoryCache(),
// });

export default client;
