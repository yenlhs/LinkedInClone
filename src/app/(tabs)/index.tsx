import { StyleSheet } from 'react-native';
import PostListItem from '../../components/PostListItem';
import { Text, View } from '../../components/Themed';
import posts from '../../../assets/data/posts.json';
import { FlatList } from 'react-native-gesture-handler';

const firstPost = posts[0];

export default function HomeFeedScreen() {
	return (
		<FlatList
			data={posts}
			renderItem={({ item }) => <PostListItem post={item} />}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ gap: 10 }}
		/>
		// <View style={styles.container}>
		// 	<PostListItem post={firstPost} />
		// </View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
