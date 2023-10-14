import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

export default function ModalScreen() {
	return (
		<View className='flex-1 items-center justify-center'>
			<Text className='text-sm font-bold'>Modal</Text>
			<View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />

			{/* Use a light status bar on iOS to account for the black space above the modal */}
			<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
		</View>
	);
}

const styles = StyleSheet.create({
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
