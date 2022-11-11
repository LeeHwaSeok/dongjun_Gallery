import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, TextInput} from 'react-native';
import IconRightButton from '../components/IconRightButton';
import events from '../lib/events';
import {updatePost} from '../lib/posts';

function ModifyScreen() {
  const navigation = useNavigation();
  const {params} = useRoute();
  //라우트 초기값을 description의 초기값으로 사용
  const [description, setDescription] = useState(params.description);

  //렌더링 최소화 해당 스크린의 모든 데이터를 렌더링하는게아니라 특정 함수만 재사용함
  //1번 인자의 함수는
  //2번인자의 데이터가 변경될 때까지 저장해놓습니다.
  const onSubmit = useCallback(async () => {
    await updatePost({
      id: params.id,
      description,
    });

    events.emit('updatePost', {
      postId: params.id,
      description,
    });

    navigation.pop();
  }, [navigation, params.id, description]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <IconRightButton onPress={onSubmit} name="check"></IconRightButton>,
    });
  }, [navigation, onSubmit]);

  console.log(params.id, params.description);
  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'height'})}
      style={styles.block}
      keyboardVerticalOffset={Platform.select({ios: 88})}
    >
      <TextInput
        style={styles.input}
        multiline
        placeholder="이 사진에 대한 설명을 입력하세요..."
        textAlignVertical="top"
        value={description}
        onChangeText={setDescription}
      ></TextInput>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  input: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    flex: 1,
    fontSize: 16,
  },
});

export default ModifyScreen;
