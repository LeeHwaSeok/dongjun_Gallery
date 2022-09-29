import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

//사용자 입력 데이터를 받아옴 상태에 따라서 여유를 줄지 결정
//...rest를 하면 명시적으로 사용하지 않아도 실행부에서 선언한 데이터를 모두 들고옴
//ref를 사용해서 다음 focus를 사용하겠다는 의미 [옵션임]
function BorderedInput({hasMarginBottom, ...rest}, ref) {
  return <TextInput style={[styles.input, hasMarginBottom && styles.margin]} ref={ref} {...rest} />;
}

const styles = StyleSheet.create({
  input: {
    borderColor: '#bdbdbd',
    borderWidth: 1,
    paddingHorizontal: 16,
    height: 48,
    backgroundColor: 'white',
  },
  margin: {
    marginBottom: 16,
  },
});

//forwardRef는 파라미터의 ref를 받아와서 사용 가능하다.
//ref를 TextInput에 설정해주면 borderedInput을 사용할 때, ref를 사용할 수 있다. 교재 439p 참고
export default React.forwardRef(BorderedInput);
