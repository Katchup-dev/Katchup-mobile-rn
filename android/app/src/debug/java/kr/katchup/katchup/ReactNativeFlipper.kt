/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * <p>This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */
package kr.katchup.katchup

import android.content.Context
import com.facebook.flipper.android.AndroidFlipperClient
import com.facebook.flipper.android.utils.FlipperUtils
import com.facebook.flipper.plugins.crashreporter.CrashReporterPlugin
import com.facebook.flipper.plugins.databases.DatabasesFlipperPlugin
import com.facebook.flipper.plugins.fresco.FrescoFlipperPlugin
import com.facebook.flipper.plugins.inspector.DescriptorMapping
import com.facebook.flipper.plugins.inspector.InspectorFlipperPlugin
import com.facebook.flipper.plugins.network.FlipperOkhttpInterceptor
import com.facebook.flipper.plugins.network.NetworkFlipperPlugin
import com.facebook.flipper.plugins.sharedpreferences.SharedPreferencesFlipperPlugin
import com.facebook.react.ReactInstanceEventListener
import com.facebook.react.ReactInstanceManager
import com.facebook.react.bridge.ReactContext
import com.facebook.react.modules.network.NetworkingModule

/**
 * Class responsible of loading Flipper inside your React Native application. This is the debug
 * flavor of it. Here you can add your own plugins and customize the Flipper setup.
 */
class ReactNativeFlipper {
    companion object {
        @JvmStatic
        fun initializeFlipper(context: Context, reactInstanceManager: ReactInstanceManager) {
            if (FlipperUtils.shouldEnableFlipper(context)) {
                val client = AndroidFlipperClient.getInstance(context).apply {
                    addPlugin(InspectorFlipperPlugin(context, DescriptorMapping.withDefaults()))
                    addPlugin(DatabasesFlipperPlugin(context))
                    addPlugin(SharedPreferencesFlipperPlugin(context))
                    addPlugin(CrashReporterPlugin.getInstance())

                    val networkFlipperPlugin = NetworkFlipperPlugin()
                    NetworkingModule.setCustomClientBuilder {
                        it.addNetworkInterceptor(FlipperOkhttpInterceptor(networkFlipperPlugin))
                    }
                    addPlugin(networkFlipperPlugin)
                }
                client.start()

                if (reactInstanceManager.currentReactContext == null) {
                    reactInstanceManager.addReactInstanceEventListener(
                        object : ReactInstanceEventListener {
                            override fun onReactContextInitialized(context: ReactContext?) {
                                reactInstanceManager.removeReactInstanceEventListener(this)
                                context?.runOnNativeModulesQueueThread {
                                    client.addPlugin(FrescoFlipperPlugin())
                                }
                            }
                        }
                    )
                } else {
                    client.addPlugin(FrescoFlipperPlugin())
                }
            }
        }
    }
}
