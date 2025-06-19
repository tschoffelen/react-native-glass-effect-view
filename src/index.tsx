import { NativeGlassEffectView } from "./NativeComponent";
import { NativeModule } from "./NativeModule";

import { FallbackGlassEffectView } from "./FallbackGlassEffectView";
import type { GlassEffectViewProps } from "./GlassEffectViewProps";

export * from "./NativeComponent";
export * from "./GlassEffectViewProps";

export const GlassEffectView = (props: GlassEffectViewProps) => {
  const nativeAvailable = NativeModule?.isAvailable();

  if (nativeAvailable) {
    return <NativeGlassEffectView {...props} />;
  }

  return <FallbackGlassEffectView {...props} />;
};
