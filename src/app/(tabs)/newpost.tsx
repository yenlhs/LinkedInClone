import { useNavigation, useRouter } from 'expo-router';
import { Text, View } from '../../components/Themed';
import { Pressable, TextInput } from 'react-native';
import { useLayoutEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { gql, useMutation } from '@apollo/client';

const insertPost = gql`
	mutation MyMutation($userid: ID, $image: String, $content: String) {
		insertPost(userid: $userid, image: $image, content: $content) {
			content
			id
			image
			userid
		}
	}
`;

export default function NewPostScreen() {
	const [content, setContent] = useState('');
	const [image, setImage] = useState(null);
	const navgiation = useNavigation();
	const router = useRouter();

	const [handleMutation, { loading, error, data }] = useMutation(insertPost);

	const onPost = async () => {
		// console.warn('Posting', content);
		try {
			await handleMutation({
				variables: {
					userid: 2,
					content: 'Hello again there',
				},
			});
		} catch (e) {
			console.log(e);
		}
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
					<Text>{loading ? 'Submitting' : 'Submit'}</Text>
				</Pressable>
			),
		});
	}, [onPost, loading]);

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
