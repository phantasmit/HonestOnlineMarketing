package com.honestonlinemarketing

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.JavaScriptModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.NativeModule
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ViewManager
import java.util.Collections

class ToastPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(ToastModule(reactContext))
    }

    override fun createViewManagers(p0: ReactApplicationContext): MutableList<ViewManager<View, ReactShadowNode<*>>> {
        //TODO("Not yet implemented")
        //return null;
        return Collections.emptyList();
    }

    fun createJSModules(): List<Class<out JavaScriptModule>> {
        return Collections.emptyList()
    }
}