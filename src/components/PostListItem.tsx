import { View, Text } from 'react-native';
import React from 'react';
import { Post } from '@/types';

type PostListItemProps = {
	post: Post;
};

const PostListItem = ({ post }: PostListItemProps) => {
	return (
		<View>
			<Text>{post.content}</Text>
		</View>
	);
};

export default PostListItem;
