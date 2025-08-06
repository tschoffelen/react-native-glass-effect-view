import { Platform } from "react-native";

import NativeGlassEffectView from "./GlassEffectViewNativeComponent";
import type { GlassEffectViewProps as InternalProps } from "./GlassEffectViewNativeComponent";
import { FallbackGlassEffectView } from "./FallbackGlassEffectView";

export * from "./GlassEffectViewNativeComponent";

export type GlassEffectViewProps = Omit<InternalProps, "useContainerEffect">;

export const isNativeModuleAvailable =
  Platform.OS === "ios" && Number(Platform.Version) >= 26;

const GlassEffectViewImpl = (props: InternalProps) => {
  if (isNativeModuleAvailable && props.useNative !== false) {
    return <NativeGlassEffectView {...props} />;
  }

  return <FallbackGlassEffectView {...props} />;
};

export const GlassEffectView = (props: GlassEffectViewProps) => {
  return <GlassEffectViewImpl {...props} useContainerEffect={false} />;
};

export const GlassEffectContainerView = (
  props: Omit<GlassEffectViewProps, "useContainerEffect">
) => {
  return <GlassEffectViewImpl {...props} useContainerEffect={true} />;
};