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
	);
}
