package {{packageName}}.viewModel;

import android.content.Context;
import android.databinding.BaseObservable;
import android.databinding.Bindable;
import android.util.Log;
import java.util.HashMap;

import {{packageName}}.BR;
import {{packageName}}.base.Collection;
import {{packageName}}.base.CollectionCallback;
import {{packageName}}.base.ViewModel;
{{import}}



public class {{className}} extends ViewModel {
    private static final String TAG = "{{className}}";

    public final static int ListViewLoadingStatusLoading        = 0;
    public final static int ListViewLoadingStatusLoadingMore    = 1;
    public final static int ListViewLoadingStatusLoadSucceed    = 2;
    public final static int ListViewLoadingStatusLoadFailed     = 3;

    public {{className}}(Context c) {
        super(c);
        {{listObjName}} = new Collection<>();
    }

    private int listViewLoadingStatus = ListViewLoadingStatusLoadSucceed;

    @Bindable
    public int getListViewLoadingStatus() {
        return listViewLoadingStatus;
    }

    @Bindable
    public void setListViewLoadingStatus(int listViewLoadingStatus) {
        this.listViewLoadingStatus = listViewLoadingStatus;
        notifyPropertyChanged(BR.listViewLoadingStatus);
    }

    private boolean loadMoreEnable = true;

    public boolean isLoadMoreEnable() {
        return loadMoreEnable;
    }

    private void setLoadMoreEnable(Collection<{{modelClassName}}> list) {
        if (list.getTotalCount() == list.size()) {
            loadMoreEnable = false;
        } else {
            loadMoreEnable = true;
        }
    }

    {{content}}
}