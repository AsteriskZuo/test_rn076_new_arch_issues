# React Native Modal Animation Issue

## Overview

A specific animation issue occurs in React Native when certain conditions are combined. This document describes the issue, how to reproduce it, and possible solutions.

## Issue Description

The animation in Modal component may not work as expected when all the following conditions are met:

1. React's Strict Mode is enabled
2. Custom animations are used within Modal component
3. New Arch is enabled in native configuration
4. Animation is implemented using `Animated.timing`

## Steps to Reproduce

```javascript
// Example configuration
import {Modal, Animated} from 'react-native';

// 1. Strict Mode enabled
<React.StrictMode>
  // 2. Modal with custom animation
  <Modal>
    <Animated.View
      // 4. Using Animated.timing
      style={[styles.container, animatedStyle]}>
      {/* Your content */}
    </Animated.View>
  </Modal>
</React.StrictMode>;

// 3. Native configuration
// android/gradle.properties
newArchEnabled = true;
```

## Solutions

### Option 1: Disable Hermes Engine

Modify your native configuration to disable Hermes:

```gradle
// android/app/build.gradle
newArchEnabled=false
```

### Option 2: Disable Strict Mode

Keep new arch enabled but remove React's Strict Mode:

```javascript
// Replace <React.StrictMode> with regular component tree
<App>{/* Your app content */}</App>
```

## How to Run Example Code

1. Clone the repository
2. Install dependencies:

```bash
yarn install
```

### Running Different Examples

The project contains multiple example:

- `App1.tsx`: Basic example showing a red square with animation
- `App2.tsx`: Example with animated red square using native driver
- `App3.tsx`: Encapsulated version of the animated red square
- `App4.tsx`: Implementation using third-party animation library
- `App5.tsx`: Menu example using third-party components
- `App6.tsx`: Complete component implementation with third-party library

To switch between examples, modify `index.js`:

Each example demonstrates different approaches to handling Modal animations with TurboModules:

- Examples 1-3 focus on native Animation API usage
- Examples 4-6 show third-party library integration options
