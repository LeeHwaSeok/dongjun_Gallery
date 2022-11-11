import {useNavigation, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {ActionSheetIOS, Platform} from 'react-native';
import events from '../lib/events';
import {removePost} from '../lib/posts';

export default function usePostActions({id, description}) {
  const [isSelecting, setIsSelecting] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const edit = () => {
    navigation.navigate('Modify', {id, description});
  };
  const remove = async () => {
    await removePost(id);
    if (route.name === 'Post') {
      navigation.pop();
    }
    events.emit('removePost', id);
  };
  const onPressMore = () => {
    if (Platform.OS === 'android') {
      setIsSelecting(true);
    } else {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['설명 수정', '게시물 삭제', '취소'],
          destructiveButtonIndex: 1,
          cancelButtonIndex: 2,
        },
        //ActionsheetIOS에서 버튼 순서를 index로 받아오는듯
        //그래서 0번은 에딧 1번은 삭제 기능을 넣음
        buttonIndex => {
          if (buttonIndex === 0) {
            edit();
          } else if (buttonIndex === 1) {
            remove();
          }
        },
      );
    }
  };

  const actions = [
    {icon: 'edit', text: '설명 수정', onPress: edit},
    {icon: 'delete', text: '게시물 삭제', onPress: remove},
  ];

  const onClose = () => {
    setIsSelecting(false);
  };
  return {
    isSelecting,
    onPressMore,
    onClose,
    actions,
  };
}
