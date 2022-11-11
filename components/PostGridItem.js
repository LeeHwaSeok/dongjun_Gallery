import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, StyleSheet, useWindowDimensions} from 'react-native';

function PostGridItem({post}) {
  const dimensions = useWindowDimensions();
  const size = (dimensions.width - 6) / 3;
  const navitagtion = useNavigation();
  const onPress = () => {
    navitagtion.navigate('Post', {post});
  };
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [{opacity: pressed ? 0.6 : 1, width: size, height: size}, styles.block]}
    >
      <Image
        style={styles.image}
        source={{uri: post.photoURL}}
        resizeMethod="resize"
        resizeMode="cover"
      ></Image>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  block: {margin: 1},
  image: {
    backgroundColor: '#bdbdbd',
    width: '100%',
    height: '100%',
  },
});

export default PostGridItem;
