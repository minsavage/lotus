package {{packageName}}.base;

import java.util.List;

/**
 * Created by danney on 15/12/8.
 */
public interface Callback<T> {
    public void onSuccess(T obj);
    public void onFail(Throwable t);
}