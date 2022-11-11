import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import PostCard from '../components/PostCard';
import events from '../lib/events';

function PostScreen() {
  const route = useRoute();
  const {post} = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const handler = ({description}) => {
      navigation.setParams({post: {...post, description}});
    };
    events.addListener('updatePost', handler);
    return () => {
      events.removeListener('updatePost', handler);
    };
  }, [post, navigation]);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <PostCard
        user={post.user}
        photoURL={post.photoURL}
        description={post.description}
        createAt={post.createAt}
        id={post.id}
      ></PostCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 40,
  },
});

export default PostScreen;
