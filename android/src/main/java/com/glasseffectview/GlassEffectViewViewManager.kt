package com.glasseffectview

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp

@ReactModule(name = GlassEffectViewViewManager.NAME)
class GlassEffectViewViewManager : SimpleViewManager<GlassEffectViewView>() {

  override fun getDelegate(): ViewManagerDelegate<GlassEffectViewView>? {
    return null
  }

  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): GlassEffectViewView {
    return GlassEffectViewView(context)
  }

  companion object {
    const val NAME = "GlassEffectViewView"
  }
}
