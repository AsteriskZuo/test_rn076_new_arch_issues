/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';

import {
  useSimulativeModalAnimation,
} from './SimuModal.hooks';
import type { SimulativeModalProps } from './types';

/**
 * Simulate a modal window.
 */
export function SimulativeModal(props: SimulativeModalProps) {
  const {
    modalAnimationType,
    modalStyle,
    disableBackgroundClose = false,
    backgroundColor,
    backgroundTransparent = false,
    children,
    propsRef,
    onFinished,
    maskStyle,
    ...others
  } = props;
  const { translateY, startShow, startHide, backgroundOpacity } =
    useSimulativeModalAnimation(modalAnimationType);
  const { width, height } = useWindowDimensions();
  const [modalVisible, setModalVisible] = React.useState(false);

  if (propsRef) {
    if (propsRef.current) {
      propsRef.current.startShow = () => {
        setModalVisible(true);
        startShow();
      };
      propsRef.current.startHide = (onf?: () => void) => {
        startHide(() => {
          setModalVisible(false);
          onf?.();
          onFinished?.();
        });
      };
    }
  }

  return (
    <View
      style={[
        {
          flex: 1,
          position: 'absolute',
          width: width,
          height: height,
          display: modalVisible === true ? 'flex' : 'none',
          // opacity: modalVisible === true ? 1 : 0,
        },
        maskStyle,
      ]}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          if (disableBackgroundClose !== true) {
            startHide(() => setModalVisible(false));
          }
        }}
      >
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
      <Animated.View
        style={[
          {
            flex: 1,
            justifyContent: 'flex-end',
            opacity: modalVisible === true ? backgroundOpacity : 0,
            transform: [{ translateY: translateY }],
          },
          modalStyle,
        ]}
        pointerEvents="box-none"
        // {...useSimulativeModalPanResponder({
        //   type: modalAnimationType,
        //   translateY,
        //   startShow,
        //   startHide,
        //   setModalVisible,
        //   onStartShouldSetPanResponder,
        // }).panHandlers}
        {...others}
      >
        {children}
      </Animated.View>
    </View>
  );
}
