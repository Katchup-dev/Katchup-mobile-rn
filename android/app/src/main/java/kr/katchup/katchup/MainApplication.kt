package kr.katchup.katchup

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader

class MainApplication : Application(), ReactApplication {
    private val reactNativeHost = object : DefaultReactNativeHost(this) {
        override fun getPackages(): MutableList<ReactPackage> {
            return PackageList(this).packages
        }

        override fun getUseDeveloperSupport() = BuildConfig.DEBUG

        override fun getJSMainModuleName() = "index"

        override val isNewArchEnabled: Boolean
            get() = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED

        override val isHermesEnabled: Boolean
            get() = BuildConfig.IS_HERMES_ENABLED
    }

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, /* native exopackage */ false)
        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            DefaultNewArchitectureEntryPoint.load()
        }
        ReactNativeFlipper.initializeFlipper(this, reactNativeHost.reactInstanceManager)
    }

    override fun getReactNativeHost(): ReactNativeHost {
        return reactNativeHost
    }
}
