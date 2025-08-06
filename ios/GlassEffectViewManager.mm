#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "RCTBridge.h"

@interface GlassEffectViewManager : RCTViewManager
@end

@implementation GlassEffectViewManager

RCT_EXPORT_MODULE(GlassEffectView)

- (UIView *)view
{
  return [[UIView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(color, NSString)
RCT_EXPORT_VIEW_PROPERTY(cornerRadius, CGFloat)

@end
