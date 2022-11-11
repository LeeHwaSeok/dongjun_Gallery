import {useNavigation, useNavigationState} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useUserContext} from '../contexts/UserContext';
import usePostActions from '../hooks/usePostActions';
import ActionSheetModal from './ActionSheetModal';
import Avatar from './Avatar';

function PostCard({user, photoURL, description, createAt, id}) {
  const routeNames = useNavigationState(state => state.routeNames);
  const date = useMemo(
    () => (createAt ? new Date(createAt._seconds * 1000) : new Date()),
    [createAt],
  );
  const navigation = useNavigation();
  const {user: me} = useUserContext();
  const isMyPost = me.id === user.id;

  const onOpenProfile = () => {
    if (routeNames.find(routeName => routeName === 'MyProfile')) {
      navigation.navigate('MyProfile');
    } else {
      navigation.navigate('Profile', {
        userId: user.id,
        displayName: user.displayName,
      });
    }
  };

  const {isSelecting, onPressMore, onClose, actions} = usePostActions({id, description});

  return (
    <View style={styles.block}>
      <View style={[styles.head, styles.paddingBlock]}>
        <Pressable style={styles.profile} onPress={onOpenProfile}>
          <Avatar source={user.photoURL && {uri: user.photoURL}}></Avatar>

          <Text style={styles.displayName}>{user.displayName}</Text>
        </Pressable>
        {isMyPost && (
          <Pressable hitSlop={8} onPress={onPressMore}>
            <Icon name="more-vert" size={20}></Icon>
          </Pressable>
        )}
      </View>
      <Image
        source={{uri: photoURL}}
        resizeMode="cover"
        resizeMethod="resize"
        style={styles.image}
      />
      <View style={styles.paddingBlock}>
        <Text style={styles.description}>{description}</Text>
        <Text date={date} style={styles.date}>
          {date.toLocaleString()}
        </Text>
      </View>
      <ActionSheetModal
        visible={isSelecting}
        actions={actions}
        onClose={onClose}
      ></ActionSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  paddingBlock: {
    paddingHorizontal: 16,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayName: {
    lineHeight: 16,
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  image: {
    backgroundColor: '#bdbdbd',
    width: '100%',
    aspectRatio: 1,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  date: {
    color: '#757557',
    fontSize: 12,
    lineHeight: 18,
  },
});

export default PostCard;
