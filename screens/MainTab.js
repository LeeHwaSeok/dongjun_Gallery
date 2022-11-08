import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CameraButton from '../components/CameraButton';
import HomeStack from './HomeStack';
import MyProfileStack from './MyProfileStack';

const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <>
      <View style={styles.block}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarshowlabel: false,
            tabBarActiveTintColor: '#6200ee',
          }}
        >
          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={{tabBarIcon: ({color}) => <Icon name="home" size={24} color={color}></Icon>}}
          ></Tab.Screen>
          <Tab.Screen
            name="MyProfileStack"
            component={MyProfileStack}
            options={{tabBarIcon: ({color}) => <Icon name="person" size={24} color={color}></Icon>}}
          ></Tab.Screen>
        </Tab.Navigator>
      </View>
      <CameraButton></CameraButton>
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    zIndex: 0,
  },
  text: {
    fontSize: 24,
  },
});

export default MainTab;
