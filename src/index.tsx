import { Platform } from "react-native";

import NativeGlassEffectView from "./GlassEffectViewNativeComponent";
import type { GlassEffectViewProps } from "./GlassEffectViewNativeComponent";
import { FallbackGlassEffectView } from "./FallbackGlassEffectView";

export * from "./GlassEffectViewNativeComponent";

export const isNativeModuleAvailable =
  Platform.OS === "ios" && Number(Platform.Version) >= 26;

export const GlassEffectView = (props: GlassEffectViewProps) => {
  if (isNativeModuleAvailable && props.useNative !== false) {
    return <NativeGlassEffectView {...props} />;
  }

  return <FallbackGlassEffectView {...props} />;
};
