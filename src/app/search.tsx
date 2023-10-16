import { View, Text, FlatList } from 'react-native';
import React, { useLayoutEffect } from 'react';
import user from '../../assets/data/user.json';
import UserListItem from '@/components/UserListItem';
import { useNavigation } from 'expo-router';

const SearchScreen = () => {
	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerSearchBarOptions: {
				placeholder: 'Search Users',
				// onChangeText:
			},
		});
	}, [navigation]);
	return <View>{/* <FlatList data={user} renderItem={({ item }) => <UserListItem user={item} />} /> */}</View>;
};

export default SearchScreen;
