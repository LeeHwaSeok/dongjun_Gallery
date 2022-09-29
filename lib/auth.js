//firebase - authentication 영역
import auth from '@react-native-firebase/auth';

//로그인
export function signIn({email, password}) {
  return auth().signInWithEmailAndPassword(email, password);
}

//회원 가입
export function signUp({email, password}) {
  return auth().createUserWithEmailAndPassword(email, password);
}

//사용자 로그인 상태 유지 *상세내용 : https://thebook.io/080236/ch09/02-02/
export function subscribeAuth(callback) {
  return auth().onAuthStateChanged(callback);
}

//로그 아웃 => chap8까진 구현하지 않음
export function signOut() {
  return auth().signOut();
}
