import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import posts from '../../../assets/data/posts.json';
import PostListItem from '../../components/PostListItem';
import { useLocalSearchParams } from 'expo-router';
import { gql, useQuery } from '@apollo/client';

const query = gql`
	query MyQuery($id: ID!) {
		post(id: $id) {
			id
			content
			image
			profile {
				id
				name
				image
				position
			}
		}
	}
`;

const PostDetailsScreen = () => {
	const { id } = useLocalSearchParams();
	const { loading, error, data } = useQuery(query, { variables: { id } });

	// const post = posts.find((post) => post.id === id);
	if (loading) {
		return <ActivityIndicator />;
	}

	if (error) {
		console.log(error);
		return <Text>Something went wrong</Text>;
	}

	// if (!post) {
	// 	return <Text>Post not found</Text>;
	// }

	return (
		<ScrollView>
			<PostListItem post={data.post} />
		</ScrollView>
	);
};

export default PostDetailsScreen;
