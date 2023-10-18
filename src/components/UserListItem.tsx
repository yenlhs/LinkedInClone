import { View, Text } from 'react-native';
import React from 'react';
import { User } from '@/types';

type UserListItemProps = {
	user: User;
};

const UserListItem = ({ user }: UserListItemProps) => {
	return (
		<View>
			<Text>{user.name}</Text>
		</View>
	);
};

export default UserListItem;
