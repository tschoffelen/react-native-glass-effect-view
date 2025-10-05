import codegenNativeComponent from "react-native/Libraries/Utilities/codegenNativeComponent";
import type { ViewProps } from "react-native";
import type { WithDefault } from "react-native/Libraries/Types/CodegenTypes";

export type GlassEffectAppearance = "light" | "dark" | "default";

export interface GlassEffectViewProps extends ViewProps {
  tintColor?: string;
  appearance?: WithDefault<GlassEffectAppearance, "default">;
  useNative?: WithDefault<boolean, true>;
  useContainerEffect?: WithDefault<boolean, false>;
}

export default codegenNativeComponent<GlassEffectViewProps>("GlassEffectView");
