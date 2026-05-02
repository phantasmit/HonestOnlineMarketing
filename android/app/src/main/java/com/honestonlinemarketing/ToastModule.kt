package com.honestonlinemarketing

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.widget.Toast
import com.droidman.ktoasty.KToasty

class ToastModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ToastModule"
    }

    @ReactMethod
    fun showToast(message: String) {
//        Toast.makeText(reactContext, message, Toast.LENGTH_LONG).show()
        KToasty.normal(reactContext, message).show()

    }
}