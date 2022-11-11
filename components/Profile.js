import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useUserContext} from '../contexts/UserContext';
import usePosts from '../hooks/usePosts';
import events from '../lib/events';
import {getUser} from '../lib/users';
import Avatar from './Avatar';
import PostGridItem from './PostGridItem';

function Profile({userId}) {
  const [user, setUser] = useState(null);

  const {posts, noMorePost, refreshing, onLoadMore, onRefresh} = usePosts(userId);

  useEffect(() => {
    getUser(userId).then(setUser);
  }, [userId]);

  if (!user || !posts) {
    return <ActivityIndicator style={styles.spinner} size={32} color="#6200ee"></ActivityIndicator>;
  }

  return (
    <FlatList
      style={styles.block}
      data={posts}
      renderItem={renderItem}
      numColumns={3}
      keyExtractor={item => item.id}
      ListHeaderComponent={
        <View style={styles.userInfo}>
          <Avatar source={user.photoURL && {uri: user.photoURL}} size={128}></Avatar>
          <Text style={styles.username}>{user.displayName}</Text>
        </View>
      }
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.25}
      ListFooterComponent={
        !noMorePost && (
          <ActivityIndicator
            style={styles.bottomSpinner}
            size={32}
            color="#6200ee"
          ></ActivityIndicator>
        )
      }
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing}></RefreshControl>
      }
    ></FlatList>
  );
}

const renderItem = ({item}) => <PostGridItem post={item}></PostGridItem>;

const styles = StyleSheet.create({
  spinner: {
    height: 64,
  },
  bottomSpinner: {
    height: 128,
  },
  block: {
    flex: 1,
  },
  userInfo: {
    paddingTop: 80,
    paddingBottom: 64,
    alignItems: 'center',
  },
  username: {
    marginTop: 8,
    fontSize: 24,
    color: '#424242',
  },
});
export default Profile;
