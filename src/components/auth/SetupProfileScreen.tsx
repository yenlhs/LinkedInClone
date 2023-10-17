import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { gql, useMutation } from '@apollo/client';
import { useUserContext } from '../../context/UserContext';

const createProfileMutation = gql`
	mutation CreateProfile($about: String, $name: String, $authid: String) {
		insertProfile(about: $about, name: $name, authid: $authid) {
			id
			name
			authid
			about
		}
	}
`;

const SetupProfileScreen = () => {
	const [name, setName] = useState('');
	const [about, setAbout] = useState('');
	const { authUser, reloadDbUser } = useUserContext();
	const [handleMutation, { loading }] = useMutation(createProfileMutation);

	const onSave = async () => {
		try {
			await handleMutation({
				variables: {
					name,
					about,
					authid: authUser.id,
				},
			});
			reloadDbUser();
		} catch (e) {
			console.log('Error', e);
		}
	};
	return (
		<View className='flex-1 justify-center items-center gap-2'>
			<Text>SetupProfileScreen</Text>
			<TextInput value={name} placeholder='Name' onChangeText={setName} className='border border-gray-200 w-52 p-2 rounded-md' />

			<TextInput
				value={about}
				placeholder='About'
				multiline
				numberOfLines={3}
				onChangeText={setAbout}
				className='border border-gray-200 w-52 p-2 rounded-md'
			/>

			<TouchableOpacity className='bg-blue-200 px-4 py-2 rounded-full' onPress={onSave}>
				<Text>{loading ? 'Saving...' : 'Save'}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SetupProfileScreen;
