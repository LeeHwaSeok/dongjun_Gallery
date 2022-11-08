import {ActivityIndicator, Image, Platform, Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {createUser} from '../lib/users';
import {signOut} from '../lib/auth';
import BorderedInput from './BorderedInput';
import CustomButton from './CustomButton';
import {useUserContext} from '../contexts/UserContext';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Avatar from './Avatar';

//로그인 후 화면임
function SetupProfile() {
  //유저 닉네임
  const [displayName, setDisplayName] = useState('');

  //네비게이션 사용
  const navigation = useNavigation();

  //받아온 Route 정보 사용
  //여기서는 firestore의 uid값을 들고옴
  const {params} = useRoute();

  // 예제) fs.uid => G8bslhCbMxca0KK4FMg1i0vKFpv1
  //      console.log.params => G8bslhCbMxca0KK4FMg1i0vKFpv1
  console.log('params : ', params, typeof params);

  //uid는 fs에서 받아온 값을 대입 or not
  const {uid} = params || {};

  //User 정보는 Context를 이용해서 app 전역으로 사용
  const {setUser} = useUserContext();

  //response는 안드로이드 이미지 정보를 갖고 있음
  const [response, setResponse] = useState(null);

  //loading은 fb와 통신할 때 딜레이 표시를 위해 사용
  const [loading, setLoading] = useState(false);

  //wellcome에서 회원정보를 입력후 '다음'을 눌렸을 때
  const onSubmit = async () => {
    //서버 통신(데이터 저장, 회신) 될때까지 로딩창 띄우기
    setLoading(true);

    //기본은 null로
    let photoURL = null;

    //데이터 저장
    if (response) {
      //기본 문법 => asset은 안드로이드 이미지 데이터를 갖고 있다.
      const asset = response.assets[0];

      //asset에서 filename과 일치하는 항목을 찾아서 확장자를 추출한다
      const extension = asset.fileName.split('.').pop(); // 확장자 추출 ex) jpg, png etc..

      //데이터 저장 기본문법
      //storage().ref('저장 폴더/ uid(유저명).extension(확장자)') 형식으로 저장하겠다는의미
      //storage => Rules => read, write : true 변환해야 사용가능
      const reference = storage().ref(`/profile/${uid}.${extension}`);

      //안드로이드는 base64로 포매팅해야함 아래는 그 과정
      if (Platform.OS === 'android') {
        await reference.putString(asset.base64, 'base64', {
          contentType: asset.type,
        });
      } else {
        await reference.putFile(asset.uri);
      }

      //데이터를 저장했다면 저장한 주소를 반환 아니면 null
      photoURL = response ? await reference.getDownloadURL() : null;
    }

    //firestore에 저장하려는 user db
    const user = {
      id: uid,
      displayName,
      photoURL,
    };

    //user명으로 회원가입
    createUser(user);

    //setUser는 UserContext(createContext).Provider로 감싸고 있어서 전역으로 사용할 수 있게함
    //쉽게말하면 로그인상태 유지임
    setUser(user);
  };

  //wellcome에서 사용중
  //로그아웃 + 이전화면으로 전환
  const onCancel = () => {
    signOut();
    navigation.goBack();
  };

  //안드로이드 photo 이미지를 사용하려면 필요한 구문임
  const onSelectImage = () => {
    //아래 구문은 사진첩을 사용하는거고 / 사진찍고 바로 쓰는거도 잇음
    launchImageLibrary(
      {
        //preset
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      res => {
        // 취소했을 경우
        if (res.didCancel) {
          return;
        }
        setResponse(res);
        //res = 이미지 정보
        //filename, filsize, height, width, type, uri, bae64 등 assets정보가 담겨있다.
      },
    );
  };

  return (
    <View style={styles.block}>
      <Pressable onPress={onSelectImage}>
        {/*wellcome에서 기본이미지 부분임
        Image source 부분에서 response[안드로이드 이미지 선택]여부에 따라 이미지 출력 */}
        <Avatar source={response && {uri: response.uri}} size={128}></Avatar>
      </Pressable>
      <View style={styles.form}>
        <BorderedInput
          placeholder="닉네임"
          value={displayName}
          onChangeText={setDisplayName}
          onSubmitEditing={onSubmit}
          returnKeyType="next"
        />
        {/**서버와 통신(이미지 저장, 회신)중이면 로딩상태 or 다음화면으로 넘어감 */}
        {loading ? (
          <ActivityIndicator size={32} color="#6200ee" style={styles.spinner} />
        ) : (
          <View style={styles.buttons}>
            <CustomButton title="다음" onPress={onSubmit} hasMarginBottom />
            <CustomButton title="취소" onPress={onCancel} theme="secondary" />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
    width: '100%',
  },
  circle: {
    backgroundColor: '#cdcdcd',
    borderRadius: 64,
    width: 128,
    height: 128,
  },
  form: {
    marginTop: 16,
    width: '100%',
  },
  buttons: {
    marginTop: 48,
  },
});

export default SetupProfile;
