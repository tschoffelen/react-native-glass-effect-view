# react-native-glass-effect-view

A native liquid glass view for iOS, with fallbacks for older versions and Android.

## Installation

```sh
npm install react-native-glass-effect-view
```

Make sure to rebuild your project after installing the package. On iOS, your project will
only build successfully on Xcode 26 or newer.

## Usage

```js
import { Text } from 'react-native';
import { GlassEffectView } from 'react-native-glass-effect-view';

// ...

<GlassEffectView isInteractive>
  <Text>Hello world!</Text>
</GlassEffectView>;
```
