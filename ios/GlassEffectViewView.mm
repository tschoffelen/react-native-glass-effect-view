#import "GlassEffectViewView.h"

#import <UIKit/UIKit.h>
#import <react/renderer/components/GlassEffectViewViewSpec/ComponentDescriptors.h>
#import <react/renderer/components/GlassEffectViewViewSpec/EventEmitters.h>
#import <react/renderer/components/GlassEffectViewViewSpec/Props.h>
#import <react/renderer/components/GlassEffectViewViewSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@interface GlassEffectViewView () <RCTGlassEffectViewViewViewProtocol>

@end

@implementation GlassEffectViewView {
  UIVisualEffectView * _view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<GlassEffectViewViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const GlassEffectViewViewProps>();
    _props = defaultProps;
    
    _view = [[UIVisualEffectView alloc] init];
    
    if (@available(iOS 26.0, *)) {
      UIGlassEffect *glassEffect = [[UIGlassEffect alloc] init];
      _view.effect = glassEffect;
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
  const auto &oldViewProps = *std::static_pointer_cast<GlassEffectViewViewProps const>(_props);
  const auto &newViewProps = *std::static_pointer_cast<GlassEffectViewViewProps const>(props);
  
  if (@available(iOS 26.0, *)) {
    if (oldViewProps.tintColor != newViewProps.tintColor || oldViewProps.isInteractive != newViewProps.isInteractive) {
      UIGlassEffect *glassEffect = [[UIGlassEffect alloc] init];
      NSString * colorToConvert = [[NSString alloc] initWithUTF8String: newViewProps.tintColor.c_str()];
      [glassEffect setTintColor:[self hexStringToColor:colorToConvert]];
      [glassEffect setInteractive:newViewProps.isInteractive];
      
      // The effect can't be updated without creating a new UIVisualEffectView
      UIVisualEffectView *newView = [[UIVisualEffectView alloc] init];
      newView.effect = glassEffect;
      
      // Set appearance
      if (newViewProps.appearance == GlassEffectViewViewAppearance::Light) {
        newView.overrideUserInterfaceStyle = UIUserInterfaceStyleLight;
      } else if (newViewProps.appearance == GlassEffectViewViewAppearance::Dark) {
        NSLog(@"Setting dark appearance");
        newView.overrideUserInterfaceStyle = UIUserInterfaceStyleDark;
      }else {
        NSLog(@"Other appearance");
      }
      
      // Move subviews from old contentView to new contentView
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

Class<RCTComponentViewProtocol> GlassEffectViewViewCls(void)
{
  return GlassEffectViewView.class;
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

