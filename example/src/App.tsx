import { useState } from 'react';
import {
  Text,
  StyleSheet,
  ImageBackground,
  View,
  Switch,
  SafeAreaView,
  Image,
} from 'react-native';
import { GlassEffectView } from 'react-native-glass-effect-view';

export default function App() {
  const [options, setOptions] = useState({
    useNative: true,
    isInteractive: true,
    tintColor: undefined as string | undefined,
    appearance: 'default',
    darkBackground: false,
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: options.darkBackground
            ? 'https://mirri.link/WaAjB3A'
            : 'https://mirri.link/JrjGa8e',
        }}
        style={styles.preview}
      >
        <View style={styles.previewInner}>
          <GlassEffectView
            isInteractive={options.isInteractive}
            tintColor={options.tintColor}
            useNative={options.useNative}
            appearance={options.appearance}
            style={styles.box}
          >
            <Text
              style={{
                color: options.darkBackground
                  ? 'rgba(255,255,255,0.8)'
                  : 'rgba(0,0,0,0.8)',
                fontSize: 17,
                fontWeight: '500',
              }}
            >
              Hello World
            </Text>
          </GlassEffectView>
          <GlassEffectView
            isInteractive={options.isInteractive}
            tintColor={options.tintColor}
            useNative={options.useNative}
            appearance={options.appearance}
            style={styles.button}
          >
            <Image
              source={{ uri: 'https://mirri.link/jfkbHkH' }}
              style={{
                width: 32,
                height: 32,
                tintColor: options.darkBackground
                  ? 'rgba(255,255,255,0.8)'
                  : 'rgba(0,0,0,0.8)',
              }}
            />
          </GlassEffectView>
        </View>
      </ImageBackground>

      <SafeAreaView>
        <View style={styles.options}>
          <View style={styles.option}>
            <Switch
              value={options.useNative}
              onValueChange={(value) =>
                setOptions({ ...options, useNative: value })
              }
            />
            <Text>Use native: {options.useNative ? 'yes' : 'no'}</Text>
          </View>
          <View style={styles.option}>
            <Switch
              value={options.isInteractive}
              onValueChange={(value) =>
                setOptions({ ...options, isInteractive: value })
              }
            />
            <Text>Interactive: {options.isInteractive ? 'yes' : 'no'}</Text>
          </View>
          <View style={styles.option}>
            <Switch
              value={options.appearance === 'dark'}
              onValueChange={(value) =>
                setOptions({
                  ...options,
                  appearance: value ? 'dark' : 'light',
                })
              }
            />
            <Text>Appearance: {options.appearance}</Text>
          </View>
          <View style={styles.option}>
            <Switch
              value={!!options.tintColor}
              onValueChange={(value) =>
                setOptions({
                  ...options,
                  tintColor: value ? '#094ECF' : undefined,
                })
              }
            />
            <Text>Tint Color: {options.tintColor || 'none'}</Text>
          </View>
          <View style={styles.option}>
            <Switch
              value={options.darkBackground}
              onValueChange={(value) =>
                setOptions({ ...options, darkBackground: value })
              }
            />
            <Text>Dark Background</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  previewInner: {
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 32,
    flexDirection: 'row',
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 180,
    height: 60,
    marginVertical: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  options: {
    padding: 20,
    gap: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
});
