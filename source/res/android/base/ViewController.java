package {{packageName}}.base;

import android.app.Activity;
import android.content.Context;
import android.content.res.Configuration;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.util.AndroidRuntimeException;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

/**
 * Created by danney on 16/1/18.
 */
public class ViewController {
    private Context context;

    private Boolean called = false;

    protected View view;

    protected Bundle props;

    int containerViewId = 0;

    String tag;

    protected ViewControllerMgr subViewControllerMgr;

    public ViewController() {
    }

    public void setContext(Context context) {
        this.context = context;
    }

    public Context getContext() {
        return context;
    }

    public Bundle getProps() {
        return props;
    }

    public void setProps(Bundle props) {
        this.props = props;
    }

    public ViewControllerMgr getSubViewControllerMgr() {
        if (subViewControllerMgr == null) {
            subViewControllerMgr = new ViewControllerMgr();
            subViewControllerMgr.addHost(hostCallback);
        }
        return subViewControllerMgr;
    }

    public void finish() {
        ((Activity) getContext()).finish();
    }

    //以下为传递Activity的事件
    public void onCreate(Bundle savedInstanceState) {
        called = true;
    }

    @Nullable
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        return null;
    }

    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
    }

    @Nullable
    public View getView() {
        return view;
    }

    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        called = true;
    }

    public void onViewStateRestored(@Nullable Bundle savedInstanceState) {
        called = true;
    }

    public void onStart() {
        called = true;
    }

    public void onResume() {
        called = true;
    }

    public void onConfigurationChanged(Configuration newConfig) {
        called = true;
    }

    public void onPause() {
        called = true;
    }

    public void onStop() {
        called = true;
    }

    public void onLowMemory() {
        called = true;
    }

    public void onDestroyView() {
        called = true;
    }

    public void onDestroy() {
        called = true;
    }

    void performCreate(Bundle savedInstanceState) {
        called = false;
        onCreate(savedInstanceState);

        if (!called) {
            throw new AndroidRuntimeException("ViewController " + this
                    + " did not call through to super.onCreate()");
        }

        if (subViewControllerMgr != null) {
            subViewControllerMgr.dispatchCreate();
        }
    }

    View performCreateView(LayoutInflater inflater, ViewGroup container,
                           Bundle savedInstanceState) {
        view = onCreateView(inflater, container, savedInstanceState);
        return view;
    }

    void performActivityCreated(Bundle savedInstanceState) {
        called = false;
        onActivityCreated(savedInstanceState);
        if (!called) {
            throw new AndroidRuntimeException("ViewController " + this
                    + " did not call through to super.onActivityCreated()");
        }
        if (subViewControllerMgr != null) {
            subViewControllerMgr.dispatchActivityCreated();
        }
    }

    void performStart() {
        called = false;
        onStart();
        if (!called) {
            throw new AndroidRuntimeException("ViewController " + this
                    + " did not call through to super.onStart()");
        }
        if (subViewControllerMgr != null) {
            subViewControllerMgr.dispatchStart();
        }
    }

    void performResume() {
        called = false;
        onResume();
        if (!called) {
            throw new AndroidRuntimeException("ViewController " + this
                    + " did not call through to super.onResume()");
        }
        if (subViewControllerMgr != null) {
            subViewControllerMgr.dispatchResume();
        }
    }

    void performConfigurationChanged(Configuration newConfig) {
        onConfigurationChanged(newConfig);
        if (subViewControllerMgr != null) {
            subViewControllerMgr.dispatchConfigurationChanged(newConfig);
        }
    }

    void performLowMemory() {
        onLowMemory();
        if (subViewControllerMgr != null) {
            subViewControllerMgr.dispatchLowMemory();
        }
    }

    void performPause() {
        if (subViewControllerMgr != null) {
            subViewControllerMgr.dispatchPause();
        }
        called = false;
        onPause();
        if (!called) {
            throw new AndroidRuntimeException("ViewController " + this
                    + " did not call through to super.onPause()");
        }
    }

    void performStop() {
        if (subViewControllerMgr != null) {
            subViewControllerMgr.dispatchStop();
        }
        called = false;
        onStop();
        if (!called) {
            throw new AndroidRuntimeException("ViewController " + this
                    + " did not call through to super.onStop()");
        }
    }

    void performDestroyView() {
        if (subViewControllerMgr != null) {
            subViewControllerMgr.dispatchDestroyView();
        }
        called = false;
        onDestroyView();
        if (!called) {
            throw new AndroidRuntimeException("ViewController " + this
                    + " did not call through to super.onDestroyView()");
        }
    }

    void performDestroy() {
        if (subViewControllerMgr != null) {
            subViewControllerMgr.dispatchDestroy();
            subViewControllerMgr = null;
        }
        called = false;
        onDestroy();
        if (!called) {
            throw new AndroidRuntimeException("ViewController " + this
                    + " did not call through to super.onDestroy()");
        }
    }

    private ViewControllerMgr.ViewControllerHostCallback hostCallback = new ViewControllerMgr.ViewControllerHostCallback() {
        @Override
        public View findViewById(int viewId) {
            return view.findViewById(viewId);
        }

        @Override
        public Context getContext() {
            return ViewController.this.getContext();
        }
    };
}