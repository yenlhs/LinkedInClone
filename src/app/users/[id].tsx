import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import userJson from '../../../assets/data/user.json';
import ExperienceListItem from '../../components/ExperienceListItem';
import { User } from '@/types';
import { ScrollView } from 'react-native-gesture-handler';
import { gql, useQuery } from '@apollo/client';

const query = gql`
	query MyQuery($id: ID!) {
		profile(id: $id) {
			id
			name
			image
			position
			about
			experience {
				id
				companyname
				companyimage
				title
				userid
			}
			backimage
		}
	}
`;

const UserProfile = () => {
	// const [user, setUser] = useState<User>(userJson);
	const { id } = useLocalSearchParams();
	const navigation = useNavigation();
	const { loading, error, data } = useQuery(query, { variables: { id } });
	const user = data?.profile;

	useLayoutEffect(() => {
		navigation.setOptions({
			title: user?.name || 'User',
		});
	}, [user?.name]);

	if (loading) {
		return <ActivityIndicator />;
	}

	if (error) {
		console.log(error);
		return <Text>Something went wrong</Text>;
	}

	const onConnect = () => {
		console.log('Connect Pressed');
	};

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			{/* header */}
			<View style={styles.header}>
				{/* background image */}
				<Image source={{ uri: user.backimage }} style={styles.backImage} />
				<View style={styles.headerContent}>
					{/* profile image */}
					<Image source={{ uri: user.image }} style={styles.image} />

					{/* name and position */}
					<Text style={styles.name}>{user.name}</Text>
					<Text style={styles.position}>{user.position}</Text>
					{/* connect button */}

					<Pressable onPress={onConnect} style={styles.button}>
						<Text style={styles.buttonText}>Connect</Text>
					</Pressable>
				</View>
			</View>

			{/* about */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>About</Text>
				<Text style={styles.paragraph}>{user.about}</Text>
			</View>

			{/* experience */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Experience</Text>
				{user.experience?.map((experience) => (
					<ExperienceListItem key={experience.id} experience={experience} />
				))}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {},
	header: {},
	backImage: {
		width: '100%',
		aspectRatio: 5 / 2,
		marginBottom: -60,
	},
	headerContent: {
		padding: 10,
	},
	image: {
		width: 120,
		aspectRatio: 1,
		// borderRadius: 50,
		// borderWidth: 3,
		// borderColor: 'white',
	},
	name: {
		fontSize: 24,
	},
	position: {},
	button: {
		backgroundColor: 'royalblue',
		padding: 10,
		alignItems: 'center',
		borderRadius: 50,
		marginVertical: 10,
	},
	buttonText: {
		color: 'white',
		fontWeight: '600',
	},
	section: {
		backgroundColor: 'white',
		padding: 10,
		marginVertical: 5,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: '600',
		marginVertical: 5,
	},
	paragraph: {
		fontSize: 14,
		lineHeight: 20,
		letterSpacing: 0.2,
	},
});

export default UserProfile;
