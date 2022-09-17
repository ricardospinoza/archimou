import React, {forwardRef, ReactNode, useImperativeHandle} from 'react';
import {Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {NODE_CENTER} from '../../constants';
import {Position} from '../../types';

interface InteractiveViewProps {
  children: ReactNode;
  size: number;
  onMove: () => void;
}

export interface InteractiveViewHandler {
  centerView: (position: Position) => void;
}

const {height, width} = Dimensions.get('window');

export const InteractiveView = forwardRef<
  InteractiveViewHandler,
  InteractiveViewProps
>(({children, size, onMove}, ref) => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const initialValue = useSharedValue({x: 0, y: 0});

  const panGesture = Gesture.Pan()
    .onStart(e => {
      initialValue.value = {
        x: x.value,
        y: y.value,
      };
    })
    .onUpdate(e => {
      x.value = e.translationX + initialValue.value.x;
      y.value = e.translationY + initialValue.value.y;
    });
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const pinchGesture = Gesture.Pinch()
    .onUpdate(e => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const gesture = Gesture.Simultaneous(panGesture, pinchGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: x.value},
      {translateY: y.value},
      {scale: scale.value},
    ],
  }));

  useImperativeHandle(ref, () => ({
    centerView,
  }));

  const centerView = (position: Position) => {
    const nodeCenter = {
      x: position.x - width / 2 + NODE_CENTER.x,
      y: position.y - height / 2 + NODE_CENTER.y,
    };

    x.value = withTiming(-nodeCenter.x, {duration: 300});
    y.value = withTiming(-nodeCenter.y, {duration: 300});
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView>
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[
              {
                backgroundColor: 'white',
                width: size,
                height: size,
                borderColor: 'black',
                position: 'relative',
                borderWidth: 2,
              } as StyleSheet.NamedStyles<{}>,
              animatedStyle,
            ]}
            onTouchCancel={onMove}>
            {children}
          </Animated.View>
        </GestureDetector>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
});
