import React from 'react';
import {StyleSheet, View, Pressable, Text, Platform} from 'react-native';

//로그인 or 회원가입 전환버튼
function CustomButton({onPress, title, hasMarginBottom, theme}) {
  const isPrimary = theme === 'primary';
  return (
    <View style={[styles.block, hasMarginBottom && styles.margin]}>
      {/*텍스트 클릭시 애니메이션 효과임 */}
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          styles.wrapper,
          isPrimary && styles.primaryWrapper,
          Platform.OS === 'ios' && pressed && {opacity: 0.5},
        ]}
        android_ripple={{
          color: isPrimary ? '#ffffff' : '#6200ee',
        }}
      >
        {/*로그인 상태냐 회원가입 상태냐에 따라서 text 색상 변화 시키는거임 */}
        <Text style={[styles.text, isPrimary ? styles.primaryText : styles.secondaryText]}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
}

CustomButton.defaultProps = {
  theme: 'primary',
};

const styles = StyleSheet.create({
  primaryWrapper: {
    backgroundColor: '#6200ee',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: '#6200ee',
  },

  overfloew: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  wrapper: {
    borderRadius: 4,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
  },
  margin: {
    marginBottom: 8,
  },
});

export default CustomButton;
