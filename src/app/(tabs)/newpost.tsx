import { useNavigation, useRouter } from 'expo-router';
import { Text, View } from '../../components/Themed';
import { Pressable, TextInput } from 'react-native';
import { useLayoutEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';

export default function NewPostScreen() {
	const [content, setContent] = useState('');
	const [image, setImage] = useState(null);
	const navgiation = useNavigation();
	const router = useRouter();

	const onPost = () => {
		console.warn('Posting', content);
		router.push('/(tabs)/');
		setContent('');
	};

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 0.5,
		});
		console.log(result);
		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	useLayoutEffect(() => {
		navgiation.setOptions({
			title: 'New Post',
			headerRight: () => (
				<Pressable onPress={onPost} className='bg-blue-100 p-2 rounded-md mr-2'>
					<Text>Submit</Text>
				</Pressable>
			),
		});
	}, [onPost]);

	return (
		<View className='flex-1 p-2'>
			<TextInput className='text-md font-bold' placeholder='What do you want to talk about?' multiline value={content} onChangeText={setContent} />
			<View className=' flex flex-row justify-around mt-auto'>
				<Pressable onPress={pickImage} className='rounded-full bg-gray-300 h-14 w-14 p-4'>
					<FontAwesome name='image' size={22} color='gray' />
				</Pressable>
				<Pressable onPress={pickImage} className='rounded-full bg-gray-300 h-14 w-14 p-4'>
					<FontAwesome name='camera' size={22} color='gray' />
				</Pressable>
				<Pressable onPress={pickImage} className='rounded-full bg-gray-300 h-14 w-14 p-4'>
					<FontAwesome name='glass' size={22} color='gray' />
				</Pressable>
			</View>
		</View>
	);
}
