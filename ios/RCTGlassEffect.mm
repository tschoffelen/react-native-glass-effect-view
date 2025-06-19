#import "RCTGlassEffect.h"

@interface RCTGlassEffect()
@end

@implementation RCTGlassEffect

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::GlassEffectViewSpecJSI>(params);
}

- (bool)isAvailable {
  if (@available(iOS 26.0, *)) {
    return YES;
  }

  return NO;
}

+ (NSString *)moduleName
{
  return @"GlassEffect";
}

@end