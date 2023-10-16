// Container component
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
	uri: 'https://massaranduba.stepzen.net/api/ordered-numbat/__graphql',
	headers: { Authorization: 'apikey massaranduba::stepzen.io+1000::2509336b30dfec9f4d39e257faa05272ec256cc160622db9c0ca1aa087caf5a0' },
	cache: new InMemoryCache(),
});

export default client;
