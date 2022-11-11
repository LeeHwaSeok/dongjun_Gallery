import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet} from 'react-native';
import PostCard from '../components/PostCard';
import usePosts from '../hooks/usePosts';
import events from '../lib/events';

function FeedScreen() {
  const {posts, noMorePost, refreshing, onLoadMore, onRefresh, removePost} = usePosts();
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
