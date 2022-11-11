import firestore from '@react-native-firebase/firestore';
import {doc} from 'prettier';
import PostCard from '../components/PostCard';

const postsCollection = firestore().collection('posts');
/**
 * firebase 인증으로 얻은 고유 id를 문서의 id로 사용
 * collection.doc(id).set() 함수 사용 했으나 이번에는 데이터를 등록하기전 id를 알지못함으로
 * 새 id를 생성해줘야한다. => collection.add()함수가 그 역할
 */
export function createPost({user, photoURL, description}) {
  return postsCollection.add({
    user,
    photoURL,
    description,
    /**
     * firestore...serverTimestmap() 값을 설정해준 이유는 firestore에 데이터가 등록되고 나서 서버 측에 해당 데이터의 값을 다시 지정하기 위함입니다.
     * 즉, 서버에 등록된 시간이아니라 사용자가 게시한 시간을 등록하게 만들어 줍니다.
     */
    createAt: firestore.FieldValue.serverTimestamp(),
  });
}

export const PAGE_SIZE = 12;
/**
 * get() => (Query) Snapshot 객체 반환
 * snapshot에는 요청한 정보에대한 결과가 담겨있음
 * snapshot 객체 내부에는 docs라는 배열이 존재하는데 데이터를 보려면 doc.data()를 호출해서 데이터를 불러온다
 */
export async function getPosts({userId, mode, id} = {}) {
  let query = postsCollection.orderBy('createAt', 'desc').limit(PAGE_SIZE);
  if (userId) {
    //유저 id와 동일한지 query
    query = query.where('user.id', '==', userId);
  }
  if (id) {
    const cursorDoc = await postsCollection.doc(id).get();
    query = mode === 'older' ? query.startAfter(cursorDoc) : query.endBefore(cursorDoc);
  }
  const snapshot = await query.get();
  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  // console.log(posts);
  return posts;
}

/**
 * Feed에서 마지막 스크롤에서 더 댕기면 추가 데이터 들고옴
 */
export async function getOlderPosts(id, userId) {
  return getPosts({
    id,
    mode: 'older',
    userId,
  });
}

/**
 * Feed에서 새로 추가된 포스트를 불러오기
 */
export async function getNewerPosts(id, userId) {
  return getPosts({
    id,
    mode: 'newer',
    userId,
  });
}

export function removePost(id) {
  return postsCollection.doc(id).delete();
}

export function updatePost({id, description}) {
  return postsCollection.doc(id).update({
    description,
  });
}
