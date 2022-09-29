import firestore from '@react-native-firebase/firestore';

//firebase에 user정보 등록, 확인
export const usersCollection = firestore().collection('users');

// 회원 가입
export function createUser({id, displayName, photoURL}) {
  return usersCollection.doc(id).set({
    id,
    displayName,
    photoURL,
  });
}

// 데이터 찾기 (여기선 로그인 기능)
export async function getUser(id) {
  const doc = await usersCollection.doc(id).get();
  return doc.data();
}
