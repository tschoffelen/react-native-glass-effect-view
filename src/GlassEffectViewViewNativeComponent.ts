import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { ViewProps } from 'react-native';
import type { WithDefault } from 'react-native/Libraries/Types/CodegenTypes';

type Appearance = 'light' | 'dark' | 'default';

interface NativeProps extends ViewProps {
  isInteractive?: boolean;
  tintColor?: string;
  appearance?: WithDefault<Appearance, 'default'>;
}

export default codegenNativeComponent<NativeProps>('GlassEffectViewView');
