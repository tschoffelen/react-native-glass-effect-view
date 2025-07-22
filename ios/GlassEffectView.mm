#import "GlassEffectView.h"

#import <UIKit/UIKit.h>
#import <UIKit/UICornerConfiguration.h>
#import <UIKit/UICornerRadius.h>

#import <react/renderer/components/GlassEffectViewSpec/ComponentDescriptors.h>
#import <react/renderer/components/GlassEffectViewSpec/EventEmitters.h>
#import <react/renderer/components/GlassEffectViewSpec/Props.h>
#import <react/renderer/components/GlassEffectViewSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@interface GlassEffectView () <RCTGlassEffectViewViewProtocol>
@end

@implementation GlassEffectView {
  UIVisualEffectView * _view;
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

    _view = [[UIVisualEffectView alloc] init];

    if (@available(iOS 26.0, *)) {
      UIGlassEffect *glassEffect = [[UIGlassEffect alloc] init];
      _view.effect = glassEffect;
    }

    self.contentView = _view;

    [self applyCornerConfiguration:self.layer.cornerRadius];
  }
  return self;
}

- (void)finalizeUpdates:(RNComponentViewUpdateMask)updateMask
{
  [super finalizeUpdates:updateMask];
  [self sendSubviewToBack:_view];
  [self applyCornerConfiguration:self.layer.cornerRadius];
}

-(void)mountChildComponentView:(UIView<RCTComponentViewProtocol> *)childComponentView index:(NSInteger)index
{
  [_view.contentView mountChildComponentView:childComponentView index:index];
}

-(void)unmountChildComponentView:(UIView<RCTComponentViewProtocol> *)childComponentView index:(NSInteger)index
{
  [_view.contentView unmountChildComponentView:childComponentView index:index];
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &oldViewProps = *std::static_pointer_cast<GlassEffectViewProps const>(_props);
  const auto &newViewProps = *std::static_pointer_cast<GlassEffectViewProps const>(props);

  float cornerRadius = newViewProps.cornerRadius;
  [self applyCornerConfiguration:cornerRadius];

  if (@available(iOS 26.0, *)) {
    if (oldViewProps.tintColor != newViewProps.tintColor || oldViewProps.isInteractive != newViewProps.isInteractive) {
      UIGlassEffect *glassEffect = [[UIGlassEffect alloc] init];
      NSString * colorToConvert = [[NSString alloc] initWithUTF8String: newViewProps.tintColor.c_str()];
      [glassEffect setTintColor:[self hexStringToColor:colorToConvert]];
      [glassEffect setInteractive:newViewProps.isInteractive];

      UIVisualEffectView *newView = [[UIVisualEffectView alloc] init];
      newView.effect = glassEffect;

      if (newViewProps.appearance == GlassEffectViewAppearance::Light) {
        newView.overrideUserInterfaceStyle = UIUserInterfaceStyleLight;
      } else if (newViewProps.appearance == GlassEffectViewAppearance::Dark) {
        newView.overrideUserInterfaceStyle = UIUserInterfaceStyleDark;
      }

      for (UIView *subview in _view.contentView.subviews) {
        [subview removeFromSuperview];
        [newView.contentView addSubview:subview];
      }

      // Применяем скругление к новому view
      [self.class applyCornerConfigurationStatic:newView radius:cornerRadius];

      self.contentView = newView;
      _view = newView;
    }
  }

  [super updateProps:props oldProps:oldProps];
}

// Новый метод для применения cornerConfiguration (или cornerRadius)
- (void)applyCornerConfiguration:(CGFloat)cornerRadius
{
  if (@available(iOS 26.0, *)) {
    if (cornerRadius > 0) {
      UICornerRadius *cornerRadiusObj = [UICornerRadius fixedRadius:cornerRadius];
      UICornerConfiguration *cornerConfig = [UICornerConfiguration configurationWithRadius:cornerRadiusObj];
      _view.cornerConfiguration = cornerConfig;
      _view.clipsToBounds = YES;
    } else {
      UICornerRadius *cornerRadiusObj = [UICornerRadius fixedRadius:0];
      UICornerConfiguration *cornerConfig = [UICornerConfiguration configurationWithRadius:cornerRadiusObj];
      _view.cornerConfiguration = cornerConfig;
      _view.clipsToBounds = NO;
    }
  } else {
    _view.layer.cornerRadius = cornerRadius;
    _view.clipsToBounds = (cornerRadius > 0);
  }
}

// Static helper, чтобы можно было вызвать для newView
+ (void)applyCornerConfigurationStatic:(UIVisualEffectView *)view radius:(CGFloat)cornerRadius
{
  if (@available(iOS 26.0, *)) {
    if (cornerRadius > 0) {
      UICornerRadius *cornerRadiusObj = [UICornerRadius fixedRadius:cornerRadius];
      UICornerConfiguration *cornerConfig = [UICornerConfiguration configurationWithRadius:cornerRadiusObj];
      view.cornerConfiguration = cornerConfig;
      view.clipsToBounds = YES;
    } else {
      UICornerRadius *cornerRadiusObj = [UICornerRadius fixedRadius:0];
      UICornerConfiguration *cornerConfig = [UICornerConfiguration configurationWithRadius:cornerRadiusObj];
      view.cornerConfiguration = cornerConfig;
      view.clipsToBounds = NO;
    }
  } else {
    view.layer.cornerRadius = cornerRadius;
    view.clipsToBounds = (cornerRadius > 0);
  }
}

Class<RCTComponentViewProtocol> GlassEffectViewCls(void)
{
  return GlassEffectView.class;
}

- hexStringToColor:(NSString *)stringToConvert
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
