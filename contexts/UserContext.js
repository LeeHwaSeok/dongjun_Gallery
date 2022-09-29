import React, {createContext, useContext, useState} from 'react';

//유저 현재상태 app전역에서 사용하기
const UserContext = createContext(null);

//provider로 감싸서 app전체사용 => app.js에 가면 이 conponent가 navigation을 감쌈
export function UserContextProvider({children}) {
  const [user, setUser] = useState(null);
  return <UserContext.Provider children={children} value={{user, setUser}} />;
}
// context 오류 체크
export function useUserContext() {
  const userContext = useContext(UserContext);
  if (!useContext) {
    throw new Error('UserContext.Provider is not found');
  }
  return userContext;
}
