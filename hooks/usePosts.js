import React, {useCallback, useEffect, useState} from 'react';
import {useUserContext} from '../contexts/UserContext';
import {getNewerPosts, getOlderPosts, getPosts, PAGE_SIZE} from '../lib/posts';
import usePostsEventEffect from './usePostsEventEffect';

export default function usePosts(userId) {
  const [posts, setPosts] = useState(null);
  const [noMorePost, setNoMorePost] = useState(false);
  const [refreshing, setRefereshing] = useState(false);
  const {user} = useUserContext();

  const onLoadMore = async () => {
    if (noMorePost || !posts || posts.length < PAGE_SIZE) {
      return;
    }
    const lastPost = posts[posts.length - 1];
    const olderPosts = await getOlderPosts(lastPost.id, userId);
    if (olderPosts.length < PAGE_SIZE) {
      setNoMorePost(true);
    }
    setPosts(posts.concat(olderPosts));
  };

  const onRefresh = useCallback(async () => {
    if (!posts || posts.length === 0 || refreshing) {
      return;
    }
    const firestPost = posts[0];
    setRefereshing(true);
    const newerPosts = await getNewerPosts(firestPost.id, userId);
    setRefereshing(false);
    if (newerPosts.length === 0) {
      return;
    }
    setPosts(newerPosts.concat(posts));
  }, [posts, userId, refreshing]);

  useEffect(() => {
    getPosts({userId}).then(_posts => {
      setPosts(_posts);
      if (_posts.length < PAGE_SIZE) {
        setNoMorePost(true);
      }
    });
  }, [userId]);

  const removePost = useCallback(
    postId => {
      setPosts(posts.filter(post => post.id !== postId));
    },
    [posts],
  );

  const updatePost = useCallback(
    ({postId, description}) => {
      const nextPosts = posts.map(post =>
        post.id === postId
          ? {
              ...post,
              description,
            }
          : post,
      );
      setPosts(nextPosts);
    },
    [posts],
  );

  usePostsEventEffect({
    refresh: onRefresh,
    removePost,
    enabled: !userId || userId === user.id,
    updatePost,
  });
  return {
    posts,
    noMorePost,
    refreshing,
    onLoadMore,
    onRefresh,
    removePost,
  };
}
