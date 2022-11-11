import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../components/SignInScreen';
import WelcomeScreen from './WelcomeScreen';
import MainTab from './MainTab';
import {useUserContext} from '../contexts/UserContext';
import {subscribeAuth} from '../lib/auth';
import {getUser} from '../lib/users';
import UploadScreen from './UploadScreen';
import ModifyScreen from './ModifyScreen';
import SettingScreen from './SettingScreen';

const Stack = createNativeStackNavigator();

function RootStack() {
  const {user, setUser} = useUserContext();

  //로그인이 되어있는지 확인하는 상태
  /**
   *  unsubsvribe를 콜백함수 내부에 호출한 것은 의미 없다.
   *  subscribeAuth(callback)에서 ballback의 반환 값은 null / userInfo
   *  비로그인 상태 null 반환 / 로그인 상태 인증 벙보 반환
   *  프로필이 있다면 UserContxt에 담는다.
   */
  useEffect(() => {
    const unsubsvribe = subscribeAuth(async cureentUser => {
      unsubsvribe();
      // console.log(cureentUser);
      if (!cureentUser) {
        return;
      }
      const profile = await getUser(cureentUser.uid);
      if (!profile) {
        return;
      }
      setUser(profile);
    });
  }, [setUser]);

  return (
    <Stack.Navigator>
      {/**로그인 상태에 따라 main으로 갈지 welcome으로 갈지  */}
      {user ? (
        <>
          <Stack.Screen name="MainTab" component={MainTab} options={{headerShown: false}} />
          <Stack.Screen
            name="Upload"
            component={UploadScreen}
            options={{title: '새 게시물', headerBackTitle: '뒤로가기'}}
          ></Stack.Screen>
          <Stack.Screen
            name="Modify"
            component={ModifyScreen}
            options={{title: '설명 수정', headerBackTitle: '뒤로가기'}}
          ></Stack.Screen>
          <Stack.Screen
            name="Setting"
            component={SettingScreen}
            options={{title: '설정', headerBackTitle: '뒤로가기'}}
          ></Stack.Screen>
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
