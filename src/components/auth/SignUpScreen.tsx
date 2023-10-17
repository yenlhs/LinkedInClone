import * as React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';

export default function SignUpScreen() {
	const { isLoaded, signUp, setActive } = useSignUp();

	const [emailAddress, setEmailAddress] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [pendingVerification, setPendingVerification] = React.useState(false);
	const [code, setCode] = React.useState('');

	// start the sign up process.
	const onSignUpPress = async () => {
		if (!isLoaded) {
			return;
		}

		try {
			await signUp.create({
				emailAddress,
				password,
			});

			// send the email.
			await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

			// change the UI to our pending section.
			setPendingVerification(true);
		} catch (err: any) {
			console.error(JSON.stringify(err, null, 2));
		}
	};

	// This verifies the user using email code that is delivered.
	const onPressVerify = async () => {
		if (!isLoaded) {
			return;
		}

		try {
			const completeSignUp = await signUp.attemptEmailAddressVerification({
				code,
			});

			await setActive({ session: completeSignUp.createdSessionId });
		} catch (err: any) {
			console.error(JSON.stringify(err, null, 2));
		}
	};

	return (
		<View>
			{!pendingVerification && (
				<View className='gap-2'>
					<View>
						<TextInput
							autoCapitalize='none'
							value={emailAddress}
							placeholder='Email...'
							onChangeText={(email) => setEmailAddress(email)}
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

					<TouchableOpacity onPress={onSignUpPress} className='rounded-full p-2 bg-blue-400 items-center'>
						<Text className='text-white'>Sign up</Text>
					</TouchableOpacity>
				</View>
			)}
			{pendingVerification && (
				<View className='gap-2'>
					<View>
						<TextInput
							value={code}
							placeholder='Code...'
							onChangeText={(code) => setCode(code)}
							className='border border-gray-200 w-52 p-2 rounded-md'
						/>
					</View>
					<TouchableOpacity onPress={onPressVerify} className='rounded-full p-2 bg-blue-400 items-center'>
						<Text className='text-white'>Verify Email</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
}
