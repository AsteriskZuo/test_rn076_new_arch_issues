/* eslint-disable react-native/no-inline-styles */
// ref: https://github.com/software-mansion/react-native-gesture-handler/blob/main/example/src/showcase/bottomSheet/index.tsx
// When using Model in React Native, the inner FlatList cannot be scrolled. ref: https://zhuanlan.zhihu.com/p/630696822

import * as React from 'react';
import {
  Animated,
  Modal as RNModal,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  useWindowDimensions,
} from 'react-native';

// import {useModalAnimation} from './Modal.hooks';
import type {SlideModalProps} from './types';

/**
 * Mainly solves the effect problem of native modal component `RNModal` display mask.
 */
export function SlideModal(props: SlideModalProps) {
  const {
    propsRef,
    modalAnimationType,
    modalStyle,
    onRequestModalClose,
    disableBackgroundClose = false,
    backgroundColor,
    backgroundTransparent = false,
    children,
    onFinished,
    keyboardVerticalOffset,
    enabledKeyboardAdjust = false,
    ...others
  } = props;
  const {height} = useWindowDimensions();
  const initialY = modalAnimationType === 'slide' ? height : 0;
  const backgroundOpacity = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(initialY)).current;
  const [visible, setVisible] = React.useState(false);

  const startShow = React.useCallback(
    (cb?: () => void) => {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        cb?.();
      });
    },
    [translateY],
  );

  const startHide = React.useCallback(
    (cb?: () => void) => {
      Animated.timing(translateY, {
        toValue: initialY,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        cb?.();
      });
    },
    [translateY, initialY],
  );

  if (propsRef.current) {
    propsRef.current.startShow = (onf?: () => void, timeout?: number) => {
      console.log('test:zuoyu:startShow', timeout);
      setVisible(true);
      if (timeout !== undefined) {
        startShow(() => {
          onf?.();
        });
      } else {
        startShow(() => {
          onf?.();
        });
      }
    };
    propsRef.current.startHide = (onf?: () => void, timeout?: number) => {
      if (timeout !== undefined) {
        startHide(() => {
          setVisible(false);
          onf?.();
          onFinished?.();
        });
      } else {
        startHide(() => {
          setVisible(false);
          onf?.();
          onFinished?.();
        });
      }
    };
  }
  console.log(
    'test:zuoyu:visible',
    visible,
    modalAnimationType,
    backgroundTransparent,
    backgroundOpacity,
    translateY,
  );

  return (
    <RNModal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onRequestModalClose}
      supportedOrientations={[
        'portrait',
        'portrait-upside-down',
        'landscape',
        'landscape-left',
        'landscape-right',
      ]}
      {...others}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (disableBackgroundClose !== true) {
            onRequestModalClose();
          }
        }}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor:
                backgroundTransparent === true
                  ? undefined
                  : (backgroundColor ?? 'red'),
              opacity: backgroundTransparent === true ? 0 : backgroundOpacity,
            },
          ]}
        />
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}
        pointerEvents={'box-none'}
        enabled={enabledKeyboardAdjust}
        style={{flex: 1}}>
        <Animated.View
          style={[
            {
              flex: 1,
              justifyContent: 'flex-end',
              opacity: modalAnimationType === 'fade' ? backgroundOpacity : 1,
              transform: [{translateY: translateY}],
            },
            modalStyle,
          ]}
          pointerEvents={'box-none'}>
          {children}
        </Animated.View>
      </KeyboardAvoidingView>
    </RNModal>
  );
}
