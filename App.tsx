/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import {
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Chatroom,
  Container,
  TextInput,
  useRoomContext,
} from 'react-native-chat-room';

const appKey = 'easemob#easeim';
const userId = 'du004';
const userName = 'du004name';
const userToken = 'YWMtQS-V2htYEfCbOcf51UsWyFzzvlQ7sUrSpVuQGlyIzFQ7untgxw4R7ars76tj9Ip5AwMAAAGWQoNsFzeeSADDNRaayvr8biZUSNWE82MtRoKfK-fmddK_IYWF97LwPg';
const userAvatar = 'https://www.baidu.com/img/flexible/logo/pc/result.png';
const roomId = '278370132754436';
const room = {
  roomId: roomId,
  owner: userId,
};

function SendMessage() {
  const [page, setPage] = React.useState(0);
  const [_appKey, setAppKey] = React.useState(appKey);
  const [id, setId] = React.useState(userId);
  const [ps, setPs] = React.useState(userToken);
  const im = useRoomContext();
  const {top} = useSafeAreaInsets();

  if (page === 0) {
    return (
      // Log in page
      <SafeAreaView style={styles.common}>
        <TextInput
          placeholder="Please App Key."
          value={_appKey}
          onChangeText={setAppKey}
        />
        <TextInput
          placeholder="Please Login ID."
          value={id}
          onChangeText={setId}
        />
        <TextInput
          placeholder="Please Login token or password."
          value={ps}
          onChangeText={setPs}
        />
        <Pressable
          style={styles.login}
          onPress={() => {
            // Use a custom avatar and nickname.
            im.login({
              userId: id,
              userToken: ps,
              userNickname: userName,
              userAvatarURL: userAvatar,
              result: res => {
                console.log('login result', res);
                if (res.isOk === true) {
                  setPage(1);
                }
              },
            });
          }}>
          <Text>{'Login'}</Text>
        </Pressable>
        <Pressable
          style={styles.login}
          onPress={() => {
            im.logout({
              result: () => {},
            });
          }}>
          <Text>{'Logout'}</Text>
        </Pressable>
      </SafeAreaView>
    );
  } else if (page === 1) {
    // chat room page
    return (
      <SafeAreaView style={styles.common}>
        <Chatroom
          messageList={{
            props: {
              visible: true,
              reportProps: {
                data: [],
              },
            },
          }}
          input={{
            props: {
              keyboardVerticalOffset: Platform.OS === 'ios' ? top : 0,
              after: [],
            },
          }}
          roomId={room.roomId}
          ownerId={room.owner}
          onError={e => {
            console.log('ChatroomScreen:onError:', e.toString());
          }}>
          <Pressable
            style={[styles.logout, styles.login]}
            onPress={() => {
              setPage(0);
              im.logout({
                result: () => {},
              });
            }}>
            <Text>{'log out'}</Text>
          </Pressable>
        </Chatroom>
      </SafeAreaView>
    );
  } else {
    return <View />;
  }
}

export function App(): React.JSX.Element {
  // initialize the chat room
  return (
    <Container
      opt={{appKey: appKey, autoLogin: false, debugModel: true} as any}>
      <SendMessage />
    </Container>
  );
}

const styles = StyleSheet.create({
  common: {
    flex: 1,
  },
  logout: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  login: {
    height: 40,
    backgroundColor: 'darkseagreen',
    borderColor: 'floralwhite',
    borderWidth: 1,
  },
});
