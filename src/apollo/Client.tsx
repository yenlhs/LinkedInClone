// Container component
import { ApolloClient, InMemoryCache, ApolloProvider, TypePolicies } from '@apollo/client';

const typePolicies: TypePolicies = {
	Query: {
		fields: {
			postPaginatedList:{
				keyArgs: false,
				merge(existing, incoming){
					return [...existing, ...incoming]
				}
			}
		}
	}
}

const client = new ApolloClient({
	uri: 'https://massaranduba.stepzen.net/api/ordered-numbat/__graphql',
	headers: { Authorization: 'apikey massaranduba::stepzen.io+1000::2509336b30dfec9f4d39e257faa05272ec256cc160622db9c0ca1aa087caf5a0' },
	cache: new InMemoryCache(),
});

export default client;
