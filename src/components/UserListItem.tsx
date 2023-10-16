import { View, Text } from 'react-native';
import React from 'react';

type UserListItemProps = {
	user: User;
};

const UserListItem = ({ user }) => {
	return (
		<View>
			<Text>user.name</Text>
		</View>
	);
};

export default UserListItem;
