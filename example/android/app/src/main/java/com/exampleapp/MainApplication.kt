package com.exampleapp

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader
import com.rnthreads.RNThreadPackage

class MainApplication : Application(), ReactApplication {

  // Using lazy to ensure it's only initialized when needed and fully constructed
  override val reactNativeHost: ReactNativeHost by lazy {
    object : DefaultReactNativeHost(this) {
      override fun getPackages(): List<ReactPackage> {
        val packages = PackageList(this).packages
        // Packages that cannot be autolinked yet can be added manually here, for example:
        packages.add(RNThreadPackage(reactNativeHost)) // Correct reference
        return packages
      }

      override fun getJSMainModuleName(): String = "index"

      override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

      override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED

      override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
    }
  }

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, /* native exopackage */ false)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      DefaultNewArchitectureEntryPoint.load()
    }
  }
}
