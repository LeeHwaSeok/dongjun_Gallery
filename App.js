import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './screens/RootStack';
import {UserContextProvider} from './contexts/UserContext';
import AsyncStorage from '@react-native-community/async-storage';

function App() {
  // clearAll();

  return (
    <UserContextProvider>
      <NavigationContainer>
        <RootStack> </RootStack>
      </NavigationContainer>
    </UserContextProvider>
  );
}

// const clearAll = async () => {
//   console.log('Storage 청소 완료');
//   try {
//     await AsyncStorage.clear();
//   } catch (e) {
//     console.log(e);
//   }
// };
export default App;
