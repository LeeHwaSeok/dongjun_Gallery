import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

function BorderedInput({hasMarginBottom, ...rest}, ref) {
  return (
    <TextInput
      style={[styles.input, hasMarginBottom && styles.margin]}
      //   onChangeText={onChangeText}
      //   value={value}
      //   placeholder={placeholder}
      ref={ref}
      {...rest}
    />
  );
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
