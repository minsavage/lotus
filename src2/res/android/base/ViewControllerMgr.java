package {{packageName}}.base;

import android.content.Context;
import android.content.res.Configuration;
import android.os.Handler;
import android.os.Message;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;

import java.util.ArrayList;

/**
 * Created by danney on 16/1/18.
 */
public class ViewControllerMgr {
    private static final int MSG_ADD = 0;

    /*
    * ViewControllerMgr的持有者
    * */
    ViewControllerHostCallback host;

    /*
    *
    * 等待被添加的ViewController
    * */
    ArrayList<ViewController> addingViewControllers;


    /*
    *
    * 已经被添加到Mgr的ViewController
    * */
    ArrayList<ViewController> viewControllers;

    public ViewControllerMgr() {
        viewControllers = new ArrayList<ViewController>();
    }

    /**
     * 将一个ViewController添加到管理器中，这样vc才能接受到所有的Activity的生命周期事件
     * */
    public void add(int containerViewId, ViewController vc, String tag) {
        if (vc == null) {
            throw new RuntimeException("ViewController can not be null");
        }

        if (addingViewControllers == null) {
            addingViewControllers = new ArrayList<ViewController>();
        }

        vc.containerViewId = containerViewId;
        vc.tag = tag;
        vc.setContext(host.getContext());
        vc.performCreate(null);

        addingViewControllers.add(vc);
        handler.sendEmptyMessage(MSG_ADD);
    }

    public void add(int containerViewId, ViewController vc) {
        add(containerViewId, vc, null);
    }

    /**
     * 添加ViewControllerMgr的持有者callback，用于从ViewControllerMgr中来调用持有者的一些接口
     * */
    public void addHost(ViewControllerHostCallback host) {
        this.host = host;
    }

    public ViewController findViewControllerByTag(String tag) {
        if (tag != null && tag.length() > 0) {
            for (int i = 0; i < viewControllers.size(); ++i) {
                String vctag = viewControllers.get(0).tag;
                if (tag.compareTo(vctag) == 0) {
                    return viewControllers.get(0);
                }
            }
        }
        return null;
    }

    public void dispatchCreate() {}

    public void dispatchActivityCreated() {}

    public void dispatchStart() {
        if (viewControllers != null) {
            for (int i = 0; i < viewControllers.size(); i++) {
                ViewController vc = viewControllers.get(i);
                if (vc != null) {
                    vc.performStart();
                }
            }
        }
    }

    public void dispatchResume() {
        if (viewControllers != null) {
            for (int i = 0; i < viewControllers.size(); i++) {
                ViewController vc = viewControllers.get(i);
                if (vc != null) {
                    vc.performResume();
                }
            }
        }
    }

    public void dispatchPause() {
        if (viewControllers != null) {
            for (int i = 0; i < viewControllers.size(); i++) {
                ViewController vc = viewControllers.get(i);
                if (vc != null) {
                    vc.performPause();
                }
            }
        }
    }

    public void dispatchStop() {
        if (viewControllers != null) {
            for (int i = 0; i < viewControllers.size(); i++) {
                ViewController vc = viewControllers.get(i);
                if (vc != null) {
                    vc.performStop();
                }
            }
        }
    }

    public void dispatchDestroyView() {
        if (viewControllers != null) {
            for (int i = 0; i < viewControllers.size(); i++) {
                ViewController vc = viewControllers.get(i);
                if (vc != null) {
                    vc.performDestroyView();
                }
            }
        }
    }

    public void dispatchDestroy() {
        if (viewControllers != null) {
            for (int i = 0; i < viewControllers.size(); i++) {
                ViewController vc = viewControllers.get(i);
                if (vc != null) {
                    vc.performDestroy();
                }
            }
        }
    }

    public void dispatchConfigurationChanged(Configuration newConfig) {
        if (viewControllers != null) {
            for (int i = 0; i < viewControllers.size(); i++) {
                ViewController vc = viewControllers.get(i);
                if (vc != null) {
                    vc.performConfigurationChanged(newConfig);
                }
            }
        }
    }

    public void dispatchLowMemory() {
        if (viewControllers != null) {
            for (int i = 0; i < viewControllers.size(); i++) {
                ViewController vc = viewControllers.get(i);
                if (vc != null) {
                    vc.performLowMemory();
                }
            }
        }
    }

    private void addSubViewContainer() {
        LayoutInflater inflater = LayoutInflater.from(host.getContext());
        int size = addingViewControllers.size();
        for (int i = 0; i < size; ++i ) {
            if (host == null) {
                throw new RuntimeException("there is no host callback in ViewControllerMgr");
            }


            ViewController vc = addingViewControllers.get(i);
            ViewGroup containerView = null;
            if (vc.containerViewId > 0) {
                containerView = (ViewGroup)host.findViewById(vc.containerViewId);
            }

            vc.performCreateView(inflater, containerView, null);
            viewControllers.add(vc);
        }
        addingViewControllers.clear();
    }

    private Handler handler = new Handler() {
        public void handleMessage(Message msg) {
            switch (msg.what) {
                case MSG_ADD:
                {
                    addSubViewContainer();
                    break;
                }
            }
            super.handleMessage(msg);
        }
    };

    /*
    * 外层持有者实现
    * */
    public interface ViewControllerHostCallback {
        View findViewById(int viewId);

        Context getContext();
    }
}