import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {getPosts} from '../lib/posts';
import {getUser} from '../lib/users';
import Avatar from './Avatar';

function Profile({userId}) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    getUser(userId).then(setUser);
    getPosts({userId}).then(setPosts);
  }, [userId]);
  if (!user || !posts) {
    return <ActivityIndicator style={styles.spinner} size={32} color="#6200ee"></ActivityIndicator>;
  }

  return (
    <FlatList
      style={styles.block}
      ListHeaderComponent={
        <View style={styles.userInfo}>
          <Avatar source={user.photoURL && {uri: user.photoURL}} size={128}></Avatar>
          <Text style={styles.username}>{user.displayName}</Text>
        </View>
      }
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  spinner: {
    height: 64,
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
