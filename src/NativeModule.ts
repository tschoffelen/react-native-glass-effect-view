import { TurboModuleRegistry, type TurboModule } from "react-native";

export interface Spec extends TurboModule {
  isAvailable(): boolean | null;
}

export const NativeModule = TurboModuleRegistry.get<Spec>("GlassEffect");
