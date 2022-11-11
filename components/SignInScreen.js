import React, {useEffect, useState} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useUserContext} from '../contexts/UserContext';
import {signIn, signUp} from '../lib/auth';
import {getUser} from '../lib/users';
import SignButtons from './SignButtons';
import SignInForm from './SignInForm';

//로그인 화면
function SignInScreen({navigation, route}) {
  /**로그인 or 회원가입 상태 확인용 변수
   * route.params || {} => undefined 상태이다.
   * 해당 변수를 사용할 때는 route.params가 true인 상태를 반환하여
   * 삼황연산자 혹은 조건 연산자 if(isSignUp){} else{} 형식으로 사용해야 정상적으로 작동이 된다.
   * true = 회원가입
   * undefined = 로그인
   */
  const {isSignUp} = route.params || {};

  // if (isSignUp) {
  //   console.log('isSignUP is true');
  // } else {
  //   console.log('isSignUp is Not true and not same false ');
  // }
  // if (isSignUp === undefined) {
  //   console.log('isSignUp is Not true and not same false ');
  // } else {
  //   console.log('isSignUp is defined');
  // }

  // fs에 데이터 적재를 위한 선언
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  // 상태에 따라 로딩창 띄우기
  const [loading, setLoading] = useState();
  // 유저 상태 App 전역에 사용
  const {setUser} = useUserContext();

  /** createChangeTextHandler는 onChangeText에서 사용하는 함수인데
   * 현재 내장함수 상태는
   ** onChangeText={createChangeTextHandler('email')}   ... 이상태임
   * 여기서 createChangeTextHandler('email')에 해당하는 부분이 name(key)이고
   * 한번 더 화살표 함수로 사용되는 부분이 value부분임
   *
   * 이해를 돕기위한 예제
   * ex)
   * onChangeText={r => createChangeTextHandler('email',r)}
   * createChangeTextHandler = (name, value) => {}
   * 이 상태를 변형한 식이 아래와 같은 식임
   * 이점은 모든 onChageText함수의 매개변수를 굳이 선언하지 않아도 된다는 이점이 있음
   **
   */
  const createChangeTextHandler = name => value => {
    setForm({...form, [name]: value});
    console.log('\n name  >>>>> ', name, '\n value >>>>> ', value, '\n form  >>>>> ', form);
  };

  //데이터를 입력받아 로그인 or 회원가입하는 부분
  const onSubmit = async () => {
    Keyboard.dismiss();
    //props를 이용해서 비구조할당
    const {email, password, confirmPassword} = form;

    //isSignUp === true => 회원가입 상태
    if (isSignUp && password !== confirmPassword) {
      Alert.alert('실패', '비밀번호가 일치하지 않습니다.');
      return;
    }

    /**fs를 사용하기 위해 info에 데이터 저장
     * 데이터 형식은 key:value로
     * 데이터 log : {"email" : "leedongjun@gmail.com", "password" : "123456"}
     */
    const info = {email, password};

    //데이터 통신중일 때 로딩화면을 띄움
    setLoading(true);
    // isSignUp의 상태에 따라 로그인 or 회원가입에 맞춰 데이터 전송
    try {
      // key: value 형식으로 데이터 전송하고
      // return값을 user가 받는다
      // 데이터는 displayName, email을 포함해 여러가지가 있다
      const {user} = isSignUp ? await signUp(info) : await signIn(info);

      //user uid는 wellcome단에서 설정할 수 있는데
      //만약 uid가 없다면 welcome단으로 넘어감(최초 가입이란 의미)
      const profile = await getUser(user.uid);
      if (!profile) {
        navigation.navigate('Welcome', {uid: user.uid});
      } else {
        setUser(profile);
      }
      console.log(user);
    } catch (e) {
      //auth 기본 오류들임
      const messages = {
        'auth/email-already-in-use': '이미 가입된 이메일입니다.',
        'auth/wrong-password': '잘못된 비밀번호 입니다.',
        'auth/user-not-found': '존재하지 않는 계정입니다.',
        'auth/invalid-email': '유효하지 않은 이메일 주소입니다.',
      };
      const msg = messages[e.code] || `${isSignUp ? '가입' : '로그인'} 실패`;
      Alert.alert('실패', msg);
      console.log(e);
    } finally {
      //통신이 끝나면 상태 off
      setLoading(false);
    }
  };

  return (
    //화면 가림 방지
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}
    >
      {
        // iphone m자라인 커버
      }
      <SafeAreaView style={styles.fullscreen}>
        <Text style={styles.text}>Dong-jun Gallery</Text>
        <View style={styles.form}>
          <SignInForm
            isSignUp={isSignUp}
            onSubmit={onSubmit}
            form={form}
            createChangeTextHandler={createChangeTextHandler}
          />
          <SignButtons isSignUp={isSignUp} onSubmit={onSubmit} loading={loading} />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 64,
    width: '100%',
    paddingHorizontal: 16,
  },
});

export default SignInScreen;
