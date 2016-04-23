package {{packageName}}.base;

import android.content.Context;
import android.util.Log;

import java.lang.reflect.Constructor;
import java.util.HashMap;

/**
 * Created by danney on 16/1/18.
 */
public class ViewModelMgr {
    private static HashMap<String, ViewModel> viewModels;

    public static ViewModel createViewModel(Class aClass, Context c) {
        if(viewModels == null) {
            viewModels = new HashMap<String, ViewModel>();
        }

        String key = aClass.getName();
        if(viewModels.containsKey(key)) {
            throw new RuntimeException(key + " exist in ViewModelMgr");
        }

        ViewModel vm = null;
        try {
            Constructor constructor = aClass.getConstructor(new Class[]{Context.class});
            vm = (ViewModel)constructor.newInstance(c);
            viewModels.put(key, vm);
        }
        catch (Exception e) {
            Log.e("ViewModelMgr", "getViewModel error, " + aClass.getSimpleName());
        }

        return vm;
    }

    public static ViewModel getViewModel(Class aClass) {
        if(viewModels == null) {
            throw new RuntimeException("view model container does not exist");
        }

        String key = aClass.getName();
        if(viewModels.containsKey(key)) {
            return viewModels.get(key);
        }
        else {
            return null;
        }
    }

    public static void removeViewModel(Class aClass) {
        if(viewModels != null) {
            viewModels.remove(aClass.getName());
        }
    }
}