import { StyleSheet, useColorScheme, View } from "react-native";
import type { GlassEffectViewProps } from "./GlassEffectViewProps";

export const FallbackGlassEffectView = (props: GlassEffectViewProps) => {
  // Determine the appearance based on the props or the user's color scheme
  const userColorScheme = useColorScheme();
  const isAuto = !props.appearance || (props.appearance as string) === "auto";
  const appearance = isAuto ? userColorScheme : props.appearance;

  const styles = appearance === "dark" ? darkStyles : lightStyles;
  const flattenedStyle = StyleSheet.flatten([styles.container, props.style]);

  return (
    <View {...props} style={flattenedStyle}>
      <View
        style={[
          styles.blur,
          {
            borderRadius: flattenedStyle.borderRadius || 0,
            backgroundColor: props.tintColor,
          },
        ]}
      />
      <View
        style={[
          styles.inner,
          { borderRadius: flattenedStyle.borderRadius || 0 },
        ]}
      >
        {props.children}
      </View>
    </View>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    borderRadius: 0,
    boxShadow: "0px 6px 24px rgba(0, 0, 0, 0.2)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  blur: {
    filter: "blur(10px)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    opacity: 0.9,
  },
  inner: {
    ...StyleSheet.absoluteFillObject,
    boxShadow: "inset 0px 0px 20px -5px rgba(255, 255, 255, 0.5)",
  },
});

const darkStyles = StyleSheet.create({
  container: {
    borderRadius: 0,
    boxShadow: "0px 6px 24px rgba(0, 0, 0, 0.2)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  blur: {
    filter: "blur(10px)",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    opacity: 0.9,
  },
  inner: {
    ...StyleSheet.absoluteFillObject,
    boxShadow: "inset 0px 0px 20px -5px rgba(255, 255, 255, 0.5)",
  },
});
