/* eslint-disable react-native/no-inline-styles */
// https://github.com/hakymz/ReactNativeCustomModal/blob/main/App.js
import React from 'react';
import {Button, View} from 'react-native';
import {
  BottomSheetNameMenu,
  Container,
  ContextNameMenuRef,
} from 'react-native-chat-uikit';

export const App = () => {
  const menuRef = React.useRef<ContextNameMenuRef>({} as any);
  const onRequestCloseMenu = React.useCallback(() => {
    menuRef.current?.startHide();
  }, []);
  return (
    <Container options={{appKey: 'sdf', autoLogin: false, debugModel: true}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <BottomSheetNameMenu
          ref={menuRef}
          onRequestModalClose={onRequestCloseMenu}
        />
        <Button
          title="Open Modal"
          onPress={() => {
            menuRef.current?.startShowWithInit([
              {
                name: 'Test',
                isHigh: true,
                onClicked: () => {
                  console.log('Test');
                },
              },
            ]);
          }}
        />
      </View>
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
