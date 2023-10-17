import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme, Text } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo/Client';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import AuthScreen from '../components/auth/AuthScreen';

const clerkkey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || '';
// const clerkkey = 'pk_test_c3BsZW5kaWQtYnVsbGRvZy05My5jbGVyay5hY2NvdW50cy5kZXYk';

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
		...FontAwesome.font,
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	const colorScheme = useColorScheme();

	return (
		<ClerkProvider publishableKey={clerkkey}>
			<ApolloProvider client={client}>
				<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
					<SignedIn>
						<Stack>
							<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
							<Stack.Screen name='posts/[id]' options={{ title: 'Post' }} />
							<Stack.Screen name='modal' options={{ presentation: 'modal' }} />
						</Stack>
					</SignedIn>
					<SignedOut>
						{/* <SignUpScreen /> */}
						<AuthScreen />
					</SignedOut>
				</ThemeProvider>
			</ApolloProvider>
		</ClerkProvider>
	);
}
