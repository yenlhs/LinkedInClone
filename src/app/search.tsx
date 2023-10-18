import { Text, View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import UserListItem from '../components/UserListItem';
import { useNavigation } from 'expo-router';
import { useLayoutEffect, useState } from 'react';
import { gql, useLazyQuery, useQuery } from '@apollo/client';

const query = gql`
	query profileSearch($term: String) {
		profileSearch(term: $term) {
			id
			image
			name
			position
		}
	}
`;

export default function SearchScreen() {
	const [search, setSearch] = useState('');

	const [handleSearch, { data, loading, error }] = useLazyQuery(query, {
		variables: { term: `%${search}%` },
	});

	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerSearchBarOptions: {
				placeholder: 'Search users',
				onChangeText: (event) => setSearch(event.nativeEvent.text),
				onBlur: () => handleSearch(),
			},
		});
	}, [navigation]);

	if (loading && !data?.profileSearch) {
		return <ActivityIndicator />;
	}
	if (error) {
		return <Text>Something went wrong...</Text>;
	}

	return (
		<View style={{ backgroundColor: 'white', flex: 1 }}>
			<FlatList contentContainerStyle={{ marginTop: 150 }} data={data?.profileSearch || []} renderItem={({ item }) => <UserListItem user={item} />} />
		</View>
	);
}
