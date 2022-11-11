import React from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {useUserContext} from '../contexts/UserContext';
import {signOut} from '../lib/auth';

function SettingScreen() {
  const {setUser} = useUserContext();

  const onLogout = async () => {
    await signOut();
    setUser(null);
  };
  return (
    <View style={styles.block}>
      <Pressable
        style={({pressed}) => [styles.item, pressed && Platform.select({ios: {opacity: 0.5}})]}
        onPress={onLogout}
        android_ripple={{
          color: '#eee',
        }}
      >
        <Text>로그아웃</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {flex: 1, paddingTop: 32},
  item: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  itemText: {
    fontSize: 16,
  },
});

export default SettingScreen;
