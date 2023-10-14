import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';

export default function NotificationsScreen() {
	return (
		<View className='flex-1 justify-center items-center'>
			<Text className='text-md font-bold'>Notifications</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
