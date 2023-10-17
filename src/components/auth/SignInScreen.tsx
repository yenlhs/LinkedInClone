import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';

export default function SignInScreen() {
	const { signIn, setActive, isLoaded } = useSignIn();

	const [emailAddress, setEmailAddress] = React.useState('');
	const [password, setPassword] = React.useState('');

	const onSignInPress = async () => {
		if (!isLoaded) {
			return;
		}

		try {
			const completeSignIn = await signIn.create({
				identifier: emailAddress,
				password,
			});
			// This is an important step,
			// This indicates the user is signed in
			await setActive({ session: completeSignIn.createdSessionId });
		} catch (err: any) {
			console.log(err);
		}
	};
	return (
		<View className='gap-2'>
			<View>
				<TextInput
					autoCapitalize='none'
					value={emailAddress}
					placeholder='Email...'
					onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
					className='border border-gray-200 w-52 p-2 rounded-md'
				/>
			</View>

			<View>
				<TextInput
					value={password}
					placeholder='Password...'
					secureTextEntry={true}
					onChangeText={(password) => setPassword(password)}
					className='border border-gray-200 w-52 p-2 rounded-md'
				/>
			</View>

			<TouchableOpacity onPress={onSignInPress} className='rounded-full w-52 p-2 bg-blue-400 items-center'>
				<Text className='text-white'>Sign in</Text>
			</TouchableOpacity>
		</View>
	);
}
