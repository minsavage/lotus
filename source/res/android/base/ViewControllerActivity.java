package {{packageName}}.base;

import android.content.Context;
import android.content.Intent;
import android.content.res.Configuration;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;

/**
 * Created by danney on 16/1/18.
 */
public abstract class ViewControllerActivity extends AppCompatActivity {
    private  ViewControllerManager viewControllerManager;

    public ViewControllerManager getViewControllerManager() {
        if (viewControllerManager == null) {
            viewControllerManager = new ViewControllerManager();
            viewControllerManager.addHost(new ViewControllerManager.ViewControllerHostCallback() {
                @Override
                public View findViewById(int viewId) {
                    return findViewById(viewId);
                }

                @Override
                public Context getContext() {
                    return ViewControllerActivity.this;
                }

                @Override
                public Bundle getProps() {
                    return getIntent().getBundleExtra("props");
                }
            });
        }
        return viewControllerManager;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getViewControllerManager().dispatchCreate();
    }

    @Override
    protected void onStart() {
        super.onStart();
        if (viewControllerManager != null) {
            viewControllerManager.dispatchStart();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (viewControllerManager != null) {
            viewControllerManager.dispatchResume();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (viewControllerManager != null) {
            viewControllerManager.dispatchPause();
        }
    }

    @Override
    protected void onStop() {
        super.onStop();
        if (viewControllerManager != null) {
            viewControllerManager.dispatchStop();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (viewControllerManager != null) {
            viewControllerManager.dispatchDestroy();
            viewControllerManager = null;
        }
    }

    @Override
    public void onSaveInstanceState(Bundle outState, PersistableBundle outPersistentState) {
        super.onSaveInstanceState(outState);
        if (viewControllerManager != null) {
            viewControllerManager.dispatchSaveInstanceState(outState, outPersistentState);
        }
    }

    @Override
    public void onRestoreInstanceState(Bundle savedInstanceState) {
        super.onRestoreInstanceState(savedInstanceState);
        if (viewControllerManager != null) {
            viewControllerManager.dispatchRestoreInstanceState(savedInstanceState);
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (viewControllerManager != null) {
            viewControllerManager.dispatchActivityResult(requestCode, resultCode, data);
        }
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        if (viewControllerManager != null) {
            viewControllerManager.dispatchConfigurationChanged(newConfig);
        }
    }

    @Override
    public void onBackPressed() {
        if (viewControllerManager != null) {
            if (!viewControllerManager.dispatchBackPressed()) {
                super.onBackPressed();
            }
        }
        else {
            super.onBackPressed();
        }
    }
}