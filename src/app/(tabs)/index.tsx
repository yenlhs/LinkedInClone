import PostListItem from '../../components/PostListItem';
import { Text, View } from '../../components/Themed';
import posts from '../../../assets/data/posts.json';
import { FlatList } from 'react-native-gesture-handler';

import { gql, useQuery } from '@apollo/client';
import { ActivityIndicator } from 'react-native';
import { useState } from 'react';

const postPaginatedList = gql`
	query PostPaginatedListQuery($first: Int, $after: Int) {
		postPaginatedList(first: $first, after: $after) {
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
	const [hasMore, setHasMore] = useState(true);
	const { loading, error, data, fetchMore, refetch } = useQuery(postPaginatedList, {
		variables: {
			first: 2,
		},
	});

	if (loading) {
		return <ActivityIndicator />;
	}
	if (error) {
		console.log(error);
		return <Text>Something went wrong!</Text>;
	}

	const loadMore = async () => {
		if (!hasMore) {
			return;
		}
		console.log('load more');
		const res = await fetchMore({
			variables: {
				after: data.postPaginatedList.length,
			},
		});

		if (res.data.postPaginatedList.length === 0) setHasMore(false);
	};
	return (
		<FlatList
			data={data.postPaginatedList}
			renderItem={({ item }) => <PostListItem post={item} />}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ gap: 10 }}
			onEndReached={loadMore}
			refreshing={loading}
			onRefresh={refetch}
		/>
	);
}
