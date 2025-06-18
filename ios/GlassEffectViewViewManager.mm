#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "RCTBridge.h"

@interface GlassEffectViewViewManager : RCTViewManager
@end

@implementation GlassEffectViewViewManager

RCT_EXPORT_MODULE(GlassEffectViewView)

- (UIView *)view
{
  return [[UIView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(color, NSString)

@end
