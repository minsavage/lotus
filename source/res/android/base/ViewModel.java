package {{packageName}}.base;

import android.content.Context;
import android.databinding.BaseObservable;

import java.lang.ref.WeakReference;

/**
 * Created by danney on 16/1/18.
 */
public class ViewModel extends BaseObservable {
    protected WeakReference<Context> context;
    public ViewModel(Context c) {
        context = new WeakReference<Context>(c);
    }
}