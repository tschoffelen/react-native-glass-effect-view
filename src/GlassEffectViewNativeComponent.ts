import codegenNativeComponent from "react-native/Libraries/Utilities/codegenNativeComponent";
import type { ViewProps } from "react-native";
import type { WithDefault } from "react-native/Libraries/Types/CodegenTypes";

export type GlassEffectAppearance = "light" | "dark" | "default";

export interface GlassEffectViewProps extends ViewProps {
  isInteractive?: boolean;
  tintColor?: string;
  appearance?: WithDefault<GlassEffectAppearance, "default">;
  useNative?: WithDefault<boolean, true>;
}

export default codegenNativeComponent<GlassEffectViewProps>("GlassEffectView");
