import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import posts from '../../../assets/data/posts.json';
import PostListItem from '../../components/PostListItem';
import { useLocalSearchParams } from 'expo-router';

const PostDetailsScreen = () => {
	const { id } = useLocalSearchParams();
	const post = posts.find((post) => post.id === id);

	return (
		<ScrollView>
			<PostListItem post={post} />
		</ScrollView>
	);
};

export default PostDetailsScreen;
