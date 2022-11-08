import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet} from 'react-native';
import PostCard from '../components/PostCard';
import {getNewerPosts, getOlderPosts, getPosts, PAGE_SIZE} from '../lib/posts';

function FeedScreen() {
  const [posts, setPosts] = useState(null);
  //마지막 포스트까지 조회했음을 명시하는 상태
  const [noMorePost, setNoMorePost] = useState(false);
  const [refreshing, setRefereshing] = useState(false);

  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때, 포스트 목록을 조회한 후 posts 상태에 담기
    getPosts().then(setPosts);
  }, []);

  const onLoadMore = async () => {
    // 이용자의 포스트 개수가 pagesize 미만이거나, 포스트가 없가나 etc.. 데이터를 더 출력하지 않음
    if (noMorePost || !posts || posts.length < PAGE_SIZE) {
      return;
    }
    const lastPost = posts[posts.length - 1];
    const olderPosts = await getOlderPosts(lastPost.id);
    if (olderPosts.length < PAGE_SIZE) {
      setNoMorePost(true);
    }
    setPosts(posts.concat(olderPosts));
  };

  const onRefresh = async () => {
    if (!posts || posts.length === 0 || refreshing) {
      return;
    }
    const firestPost = posts[0];
    setRefereshing(true);
    const newerPosts = await getNewerPosts(firestPost.id);
    setRefereshing(false);
    if (newerPosts.length === 0) {
      return;
    }
    setPosts(newerPosts.concat(posts));
  };

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.75}
      ListFooterComponent={
        !noMorePost && (
          <ActivityIndicator style={styles.spinner} size={32} color="#6200ee"></ActivityIndicator>
        )
      }
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing}></RefreshControl>
      }
    ></FlatList>
  );
}

const renderItem = ({item}) => (
  <PostCard
    createAt={item.createAt}
    description={item.description}
    id={item.id}
    user={item.user}
    photoURL={item.photoURL}
  ></PostCard>
);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 48,
  },
  spinner: {
    height: 64,
  },
});
export default FeedScreen;
