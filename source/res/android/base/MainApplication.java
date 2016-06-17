package com.y2go.ich.base;

import android.app.Application;

import com.facebook.drawee.backends.pipeline.Fresco;

/**
 * Created by danney on 16/6/14.
 */
public class MainApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Fresco.initialize(this);
    }
}