import { Pressable } from 'react-native';
import { Text, View } from '../../components/Themed';
import { useAuth } from '@clerk/clerk-expo';

export default function JobsScreen() {
	const { isLoaded, signOut } = useAuth();
	return (
		<View className='flex-1 justify-center items-center'>
			<Text className='text-md font-bold'>Jobs</Text>
			<Pressable onPress={() => signOut()}>
				<Text className='text-md text-red-600'>Sign Out</Text>
			</Pressable>
		</View>
	);
}
