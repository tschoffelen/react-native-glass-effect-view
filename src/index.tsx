import { Platform } from "react-native";

import NativeGlassEffectView from "./GlassEffectViewNativeComponent";
import type { GlassEffectViewProps as InternalProps } from "./GlassEffectViewNativeComponent";
import { FallbackGlassEffectView } from "./FallbackGlassEffectView";

export * from "./GlassEffectViewNativeComponent";

export type GlassEffectViewProps = Omit<InternalProps, "useContainerEffect">;

const getIOSMajorVersion = (): number => {
  const version = String(Platform.Version);
  return parseInt(version.split('.')?.[0] ?? '0', 10);
};

export const isNativeModuleAvailable =
  Platform.OS === "ios" && getIOSMajorVersion() >= 26;

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