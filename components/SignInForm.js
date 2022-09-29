import React, {useRef} from 'react';
import BorderedInput from './BorderedInput';

function SignInForm({isSignUp, onSubmit, form, createChangeTextHandler}) {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  return (
    <>
      <BorderedInput
        hasMarginBottom
        placeholder="이메일을 입력하세요"
        value={form.email}
        //createChageTextHandler('email')은 선언부의 name(key)에 해당하는 부분
        onChangeText={createChangeTextHandler('email')}
        autoCapitalize="none"
        autoCorrect={false}
        autoCompleteType="email"
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current.focus()}
      />
      <BorderedInput
        placeholder="비밀번호를 입력하세요"
        hasMarginBottom={isSignUp}
        value={form.password}
        onChangeText={createChangeTextHandler('password')}
        secureTextEntry
        ref={passwordRef}
        returnKeyType={isSignUp ? 'next' : 'done'}
        //조건식으로 isSignup(회원가입) 상태에서 enter를 누르면 다음 포커스로 가라는 의미임
        onSubmitEditing={() => {
          if (isSignUp) {
            confirmPasswordRef.current.focus();
          } else {
            onSubmit();
          }
        }}
      />
      {isSignUp && (
        <BorderedInput
          placeholder="비밀번호를 확인하세요"
          value={form.confirmPassword}
          onChangeText={createChangeTextHandler('confirmPassword')}
          secureTextEntry
          ref={confirmPasswordRef}
          returnKeyType={'done'}
          //조건식으로 isSignup(회원가입) 상태에서 enter를 누르면 다음 포커스로 가라는 의미임
          onSubmitEditing={onSubmit}
        />
      )}
    </>
  );
}

export default SignInForm;
