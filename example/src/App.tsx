import { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  ImageBackground,
  View,
  Switch,
  SafeAreaView,
  Image,
  Pressable,
} from 'react-native';
import { GlassEffectView } from 'react-native-glass-effect-view';

/**
 * Demonstrates the layoutSubviews fix.
 *
 * Without the fix, the "Delayed Mount" cards render as completely transparent
 * because the UIVisualEffectView frame is never synced with its parent bounds
 * when the component mounts during an async state transition.
 *
 * Tap "Toggle Delayed Cards" to show/hide the conditionally-mounted cards.
 * They should render with the glass effect immediately on mount.
 */
const DelayedMountDemo = () => {
  const [showCards, setShowCards] = useState(false);
  const [showDelayedCards, setShowDelayedCards] = useState(false);

  // Simulate an async state transition (e.g., loading → content)
  useEffect(() => {
    if (showCards) {
      const timer = setTimeout(() => setShowDelayedCards(true), 500);
      return () => clearTimeout(timer);
    }
    setShowDelayedCards(false);
  }, [showCards]);

  return (
    <View style={styles.demoSection}>
      <Pressable
        onPress={() => setShowCards((prev) => !prev)}
        style={styles.toggleButton}
      >
        <Text style={styles.toggleText}>
          {showCards ? 'Hide Delayed Cards' : 'Show Delayed Cards'}
        </Text>
      </Pressable>
      {showDelayedCards && (
        <View style={styles.cardRow}>
          <GlassEffectView style={styles.card}>
            <Text style={styles.cardText}>Delayed{'\n'}Mount 1</Text>
          </GlassEffectView>
          <GlassEffectView style={styles.card}>
            <Text style={styles.cardText}>Delayed{'\n'}Mount 2</Text>
          </GlassEffectView>
        </View>
      )}
    </View>
  );
};

export default function App() {
  const [options, setOptions] = useState({
    useNative: true,
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
              Always Mounted
            </Text>
          </GlassEffectView>
          <GlassEffectView
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

        <DelayedMountDemo />
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
  demoSection: {
    marginTop: 24,
    alignItems: 'center',
    gap: 16,
  },
  toggleButton: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  toggleText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    width: 140,
    height: 80,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});
