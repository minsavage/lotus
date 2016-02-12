package {{packageName}}.base;

/**
 * Created by danney on 15/12/8.
 */
public interface CollectionCallback<T> {
    public void onSuccess(Collection<T> list);
    public void onFail(Throwable t);
}