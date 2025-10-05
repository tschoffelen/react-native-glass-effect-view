#import "GlassEffectView.h"

#import <UIKit/UIKit.h>
#import <react/renderer/components/GlassEffectViewSpec/ComponentDescriptors.h>
#import <react/renderer/components/GlassEffectViewSpec/EventEmitters.h>
#import <react/renderer/components/GlassEffectViewSpec/Props.h>
#import <react/renderer/components/GlassEffectViewSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@interface GlassEffectView () <RCTGlassEffectViewViewProtocol>
@end

@implementation GlassEffectView {
  UIVisualEffectView *_view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<GlassEffectViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const GlassEffectViewProps>();
    _props = defaultProps;

    // Dynamically resolve UIGlassEffect at runtime
    Class glassClass = NSClassFromString(@"UIGlassEffect");
    if (glassClass) {
      id glassEffect = [[glassClass alloc] init];
      _view = [[UIVisualEffectView alloc] initWithEffect:glassEffect];
    } else {
      UIBlurEffect *fallback = [UIBlurEffect effectWithStyle:UIBlurEffectStyleSystemUltraThinMaterial];
      _view = [[UIVisualEffectView alloc] initWithEffect:fallback];
    }

    self.contentView = _view;
    _view.layer.cornerRadius = self.layer.cornerRadius;
    _view.clipsToBounds = true;
  }

  return self;
}

- (void)finalizeUpdates:(RNComponentViewUpdateMask)updateMask
{
  [super finalizeUpdates:updateMask];

  [self sendSubviewToBack:_view];
  _view.layer.cornerRadius = self.layer.cornerRadius;
}

- (void)mountChildComponentView:(UIView<RCTComponentViewProtocol> *)childComponentView index:(NSInteger)index
{
  [_view.contentView mountChildComponentView:childComponentView index:index];
}

- (void)unmountChildComponentView:(UIView<RCTComponentViewProtocol> *)childComponentView index:(NSInteger)index
{
  [_view.contentView unmountChildComponentView:childComponentView index:index];
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &oldViewProps = *std::static_pointer_cast<GlassEffectViewProps const>(_props);
  const auto &newViewProps = *std::static_pointer_cast<GlassEffectViewProps const>(props);

  Class glassClass = nil;
  if (newViewProps.useContainerEffect) {
    glassClass = NSClassFromString(@"UIGlassContainerEffect");
  } else {
    glassClass = NSClassFromString(@"UIGlassEffect");
  }

  if (glassClass) {
    if (
      oldViewProps.tintColor != newViewProps.tintColor ||
      oldViewProps.useContainerEffect != newViewProps.useContainerEffect
    ) {
      id glassEffect = [[glassClass alloc] init];

      // Apply props
      NSString *colorToConvert = [[NSString alloc] initWithUTF8String:newViewProps.tintColor.c_str()];
      UIColor *tintColor = [self hexStringToColor:colorToConvert];

      if ([glassEffect respondsToSelector:@selector(setTintColor:)]) {
        [glassEffect setTintColor:tintColor];
      }
      if ([glassEffect respondsToSelector:@selector(setSpacing:)]) {
        [glassEffect setSpacing:6.0];
      }

      UIVisualEffectView *newView = [[UIVisualEffectView alloc] initWithEffect:glassEffect];

      // Set appearance
      if (newViewProps.appearance == GlassEffectViewAppearance::Light) {
        newView.overrideUserInterfaceStyle = UIUserInterfaceStyleLight;
      } else if (newViewProps.appearance == GlassEffectViewAppearance::Dark) {
        newView.overrideUserInterfaceStyle = UIUserInterfaceStyleDark;
      }

      // Transfer children to new view
      for (UIView *subview in _view.contentView.subviews) {
        [subview removeFromSuperview];
        [newView.contentView addSubview:subview];
      }

      self.contentView = newView;
      _view = newView;
    }
  }

  [super updateProps:props oldProps:oldProps];
}

Class<RCTComponentViewProtocol> GlassEffectViewCls(void)
{
  return GlassEffectView.class;
}

- (UIColor *)hexStringToColor:(NSString *)stringToConvert
{
  NSString *noHashString = [stringToConvert stringByReplacingOccurrencesOfString:@"#" withString:@""];
  NSScanner *stringScanner = [NSScanner scannerWithString:noHashString];

  unsigned hex;
  if (![stringScanner scanHexInt:&hex]) return nil;

  int r = (hex >> 16) & 0xFF;
  int g = (hex >> 8) & 0xFF;
  int b = (hex) & 0xFF;

  return [UIColor colorWithRed:r / 255.0f green:g / 255.0f blue:b / 255.0f alpha:1.0f];
}

@end
