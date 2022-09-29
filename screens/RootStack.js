import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../components/SignInScreen';
import WelcomeScreen from './WelcomeScreen';
import MainTab from './MainTab';
import {useUserContext} from '../contexts/UserContext';

const Stack = createNativeStackNavigator();

function RootStack() {
  const {user} = useUserContext();
  return (
    <Stack.Navigator>
      {/**유저 상태에 따라 main으로 갈지 welcome으로 갈지  */}
      {user ? (
        <>
          <Stack.Screen name="MainTab" component={MainTab} options={{headerShown: false}} />
        </>
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default RootStack;
