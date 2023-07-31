import React from 'react';
import { getImageSrc } from '../../func/commonLogicHelper';
import UserMessageView from './UserMessageView';

export default function UserMessage({ user, startMessage }) {
  /** UserMessage의 만의 고유한 로직과 UI 관심사를 분리하여 코드 가독성을 높인다 */

  const props = {
    name: user?.name,
    image: getImageSrc(user),
    message: user?.chatMessages[0]?.message,
    time: user?.chatMessages[0]?.timeStamp,
    goToChatScreen: () => startMessage(user),
  };
  return <UserMessageView {...props} />;
}
