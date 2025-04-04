/* eslint-disable react-native/no-inline-styles */
// https://github.com/hakymz/ReactNativeCustomModal/blob/main/App.js
import React from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ModalRef, SlideModal} from './Modal';

export const App = () => {
  const propsRef = React.useRef<ModalRef>({} as ModalRef);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <SlideModal
        propsRef={propsRef}
        modalAnimationType="slide"
        onRequestModalClose={() => propsRef.current?.startHide()}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => propsRef.current?.startHide()}>
              <Text>{'close'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text>{'logo'}</Text>
        </View>

        <Text style={{marginVertical: 30, fontSize: 20, textAlign: 'center'}}>
          Congratulations registration was successful
        </Text>
      </SlideModal>
      <Button
        title="Open Modal"
        onPress={() => propsRef.current?.startShow()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export const StrictModeApp = () => {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};
