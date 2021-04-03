import React from 'react';
import PropTypes from 'prop-types';

import { COMMON_CHAT, PERSONAL_CHAT, CHAT_TABS } from './const';
import { Component as Chat } from '../Chat';
import { Container as ChatTabs } from '../ChatTabs';


const ChatContainer = ({
  currentChat,
  messages,
  replies,
  logMode,
  showPreview,
  hidePreview,
  ignoreAdd,
  control,
  settings
}) => {
  return (
    <div>
      <ChatTabs tabs={CHAT_TABS} />
      <Chat
        isVisible={currentChat === COMMON_CHAT}
        messages={messages}
        replies={replies}
        logMode={logMode}
        showPreview={showPreview}
        hidePreview={hidePreview}
        ignoreAdd={ignoreAdd}
        control={control}
        settings={settings}
      />
      <Chat
        isVisible={currentChat === PERSONAL_CHAT}
        messages={messages}
        replies={replies}
        logMode={logMode}
        showPreview={showPreview}
        hidePreview={hidePreview}
        ignoreAdd={ignoreAdd}
        control={control}
        settings={settings}
      />
    </div>
  );
};

ChatContainer.propTypes = {
  currentChat: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired,
  replies: PropTypes.object.isRequired,
  logMode: PropTypes.bool.isRequired,
  showPreview: PropTypes.func.isRequired,
  hidePreview: PropTypes.func.isRequired,
  ignoreAdd: PropTypes.func.isRequired,
  control: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
};

export default ChatContainer;
