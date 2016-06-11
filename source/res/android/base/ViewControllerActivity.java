package {{packageName}}.base;

import android.app.Activity;
import android.content.Intent;
import android.content.res.Configuration;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;

/**
 * Created by danney on 16/1/18.
 */
public abstract class ViewControllerActivity extends Activity {
    private ViewController rootViewController;

    public abstract Class<ViewController> getViewControllerClass();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        try {
            Class<ViewController> aClass = getViewControllerClass();
            rootViewController = aClass.newInstance();
            rootViewController.setContext(this);

            Intent intent = getIntent();
            Bundle props = intent.getBundleExtra("props");
            if(props != null) {
                rootViewController.setProps(props);
            }

            rootViewController.performCreate(savedInstanceState);
        }
        catch (InstantiationException e) {
            throw new RuntimeException("view controller new instance error");
        }
        catch (IllegalAccessException e) {
            throw new RuntimeException("view controller new instance error");
        }

        LayoutInflater inflater = LayoutInflater.from(this);
        View view = rootViewController.performCreateView(inflater, null, null);
        setContentView(view);
    }

    @Override
    protected void onStart() {
        super.onStart();
        rootViewController.performStart();
    }

    @Override
    protected void onResume() {
        super.onResume();
        rootViewController.performResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
        rootViewController.performPause();
    }

    @Override
    protected void onStop() {
        super.onStop();
        rootViewController.performStop();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        rootViewController.performDestroyView();
        rootViewController.performDestroy();
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        rootViewController.performConfigurationChanged(newConfig);
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
    }
}