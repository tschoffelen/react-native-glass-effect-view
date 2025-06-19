import type { ViewProps } from "react-native";
import type { WithDefault } from "react-native/Libraries/Types/CodegenTypes";

export type GlassEffectAppearance = "light" | "dark" | "default";

export interface GlassEffectViewProps extends ViewProps {
  isInteractive?: boolean;
  tintColor?: string;
  appearance?: WithDefault<GlassEffectAppearance, "default">;
}
