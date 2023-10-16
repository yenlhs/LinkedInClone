import PostListItem from '../../components/PostListItem';
import { Text, View } from '../../components/Themed';
import posts from '../../../assets/data/posts.json';
import { FlatList } from 'react-native-gesture-handler';

import { gql, useQuery } from '@apollo/client';
import { ActivityIndicator } from 'react-native';

const postList = gql`
	query PostListQuery {
		postList {
			id
			content
			image
			profile {
				id
				name
				position
				image
			}
		}
	}
`;

const firstPost = posts[0];

export default function HomeFeedScreen() {
	const { loading, error, data } = useQuery(postList);
	console.log(data);

	if (loading) {
		return <ActivityIndicator />;
	}
	if (error) {
		console.log(error);
		return <Text>Something went wrong!</Text>;
	}
	return (
		<FlatList
			data={data.postList}
			renderItem={({ item }) => <PostListItem post={item} />}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ gap: 10 }}
		/>
	);
}
