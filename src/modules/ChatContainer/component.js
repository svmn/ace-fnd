import React from 'react';
import PropTypes from 'prop-types';

import { CHAT_TABS } from './const';
import { Component as Chat } from '../Chat';
import { Container as ChatTabs } from '../ChatTabs';


const ChatContainer = ({ messages, replies, logMode, showPreview, hidePreview, ignoreAdd, control, settings }) => {
  return (
    <div>
      <ChatTabs tabs={CHAT_TABS} />
      <Chat
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
