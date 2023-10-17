import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import SignInScreen from './SignInScreen';
import { SignUp } from '@clerk/clerk-react';
import SignUpScreen from './SignUpScreen';

const AuthScreen = () => {
	const [signup, setSignup] = useState(false);
	return (
		<View className='flex-1 justify-center items-center'>
			{signup ? <SignUpScreen /> : <SignInScreen />}
			<Pressable className='flex flex-row p-2 items-center' onPress={() => setSignup(!signup)}>
				<Text className='text-xs'>{signup ? `Already have an account?` : `Don't have an account`}</Text>
				<Text className='p-2 text-xs text-blue-600'>{signup ? `Sign in` : `Sign up`}</Text>
			</Pressable>
		</View>
	);
};

export default AuthScreen;
