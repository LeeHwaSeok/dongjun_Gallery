import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import IconRightButton from '../components/IconRightButton';
import Profile from '../components/Profile';
import {useUserContext} from '../contexts/UserContext';

function MyProfileScreen() {
  const {user} = useUserContext();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: user.displayName,
      headerRight: () => (
        <IconRightButton
          name="settings"
          onPress={() => navigation.push('Setting')}
        ></IconRightButton>
      ),
    });
  }, [navigation, user]);
  return <Profile userId={user.id}></Profile>;
}
export default MyProfileScreen;
