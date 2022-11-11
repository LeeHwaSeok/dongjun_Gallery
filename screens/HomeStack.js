import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import FeedScreen from './FeedScreen';
import PostScreen from './PostScreen';
import ProfileScreen from './ProfileScreen';

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={FeedScreen}></Stack.Screen>
      <Stack.Screen name="Profile" component={ProfileScreen}></Stack.Screen>
      <Stack.Screen name="Post" component={PostScreen} options={{title: '게시물'}}></Stack.Screen>
    </Stack.Navigator>
  );
}
export default HomeStack;
