import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import { Post } from '@/types';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';

type PostListItemProps = {
	post: Post;
};

type FooterButtonProp = {
	text: string;
	icon: React.ComponentProps<typeof FontAwesome>['name'];
};

const FooterButton = ({ text, icon }: FooterButtonProp) => {
	return (
		<View style={{ flexDirection: 'row' }}>
			<FontAwesome name={icon} size={16} color='gray' />
			<Text style={{ marginLeft: 5, color: 'gray', fontWeight: '500' }}>{text}</Text>
		</View>
	);
};

const PostListItem = ({ post }: PostListItemProps) => {
	return (
		<Link href={`/posts/${post.id}`} asChild>
			<Pressable style={{ flex: 1 }}>
				{/* Header */}
				<Link href={`/users/${post.profile.id}`} asChild>
					<Pressable style={styles.header}>
						<Image source={{ uri: post.profile.image }} style={styles.userImage} />
						<View>
							<Text style={styles.userName}>{post.profile.name}</Text>
							<Text>{post.profile.position}</Text>
						</View>
					</Pressable>
				</Link>

				{/* Text Content */}
				<Text style={styles.content}>{post.content}</Text>

				{/* Conditionally render post image */}
				{post.image && <Image source={{ uri: post.image }} style={styles.postImage} />}

				{/* footer */}
				<View style={styles.footer}>
					<FooterButton text='Like' icon='thumbs-o-up' />
					<FooterButton text='Comment' icon='comment-o' />
					<FooterButton text='Share' icon='share' />
				</View>
			</Pressable>
		</Link>
	);
};

const styles = StyleSheet.create({
	header: { flexDirection: 'row', alignItems: 'center', padding: 10 },
	userName: {
		fontWeight: 'bold',
		fontSize: 16,
		marginBottom: 5,
	},
	userImage: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
	postImage: { width: '100%', aspectRatio: 1 },
	content: {
		margin: 10,
		marginTop: 0,
	},
	footer: {
		flexDirection: 'row',
		paddingVertical: 10,
		justifyContent: 'space-around',
		borderTopWidth: 0.5,
		borderColor: 'lightgray',
	},
});

export default PostListItem;
