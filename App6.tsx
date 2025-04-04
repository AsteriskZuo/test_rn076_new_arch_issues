// https://github.com/hakymz/ReactNativeCustomModal/blob/main/App.js
import React from 'react';
import {Container, ConversationList} from 'react-native-chat-uikit';

export const App = () => {
  return (
    <Container options={{appKey: 'sdf', autoLogin: false, debugModel: true}}>
      <ConversationList />
    </Container>
  );
};

export const StrictModeApp = () => {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};
