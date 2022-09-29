import firestore from '@react-native-firebase/firestore';

//collection 값을 조회, 등록, 삭제
export const usersCollection = firestore().collection('users');

// data 저장
export function createUser({id, displayName, photoURL}) {
  return usersCollection.doc(id).set({
    id,
    displayName,
    photoURL,
  });
}

// data 조회
export async function getUser(id) {
  const doc = await usersCollection.doc(id).get();
  return doc.data();
}
