export const GRAPHQL_SERVER = process.env.GRAPHQL_SERVER ? process.env.GRAPHQL_SERVER : 'http://localhost:5000';

export const GRAPHQL_SERVER_SOCKET = process.env.GRAPHQL_SERVER_SOCKET
	? process.env.GRAPHQL_SERVER_SOCKET
	: 'ws://localhost:5000';
