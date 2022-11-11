import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import MyProfileScreen from './MyProfileScreen';
import PostScreen from './PostScreen';

const Stack = createNativeStackNavigator();

function MyProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyProfile" component={MyProfileScreen}></Stack.Screen>
      <Stack.Screen name="Post" component={PostScreen} options={{title: '게시물'}}></Stack.Screen>
    </Stack.Navigator>
  );
}
export default MyProfileStack;
