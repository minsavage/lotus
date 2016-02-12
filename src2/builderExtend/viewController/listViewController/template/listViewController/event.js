private void prepareData() {
    {{viewModelObjName}}.setListViewLoadingStatus({{viewModelClassName}}.ListViewLoadingStatusLoading);
}

PullToRefreshBase.OnRefreshListener2 onRefreshListener = new PullToRefreshBase.OnRefreshListener2<View>() {
    @Override
    public void onPullDownToRefresh(PullToRefreshBase refreshView) {
        {{viewModelObjName}}.setListViewLoadingStatus({{viewModelClassName}}.ListViewLoadingStatusLoading);
    }

    @Override
    public void onPullUpToRefresh(PullToRefreshBase refreshView) {
        {{viewModelObjName}}.setListViewLoadingStatus({{viewModelClassName}}.ListViewLoadingStatusLoadingMore);
    }
};

AbsListView.OnScrollListener onScrollListener = new AbsListView.OnScrollListener() {
    @Override
    public void onScrollStateChanged(AbsListView view, int scrollState) {

    }

    @Override
    public void onScroll(AbsListView view, int firstVisibleItem, int visibleItemCount, int totalItemCount) {

    }
};

private void setLoadingStatus() {
    int status = {{viewModelObjName}}.getListViewLoadingStatus();
    switch (status) {
        case {{viewModelClassName}}.ListViewLoadingStatusLoading: {
            {{listViewObjName}}.setRefreshing();
            {{viewModelObjName}}.query{{modelClassName}}s();
            break;
        }

        case {{viewModelClassName}}.ListViewLoadingStatusLoadingMore: {
            {{viewModelObjName}}.query{{modelClassName}}sMore();
            break;
        }

        case {{viewModelClassName}}.ListViewLoadingStatusLoadSucceed: {
            adapter.notifyDataSetChanged();
            if ({{listViewObjName}}.isRefreshing()) {
                {{listViewObjName}}.onRefreshComplete();
            }

            if ({{viewModelObjName}}.isLoadMoreEnable()) {
                if ({{listViewObjName}}.getMode() != PullToRefreshBase.Mode.BOTH) {
                    {{listViewObjName}}.setMode(PullToRefreshBase.Mode.BOTH);
                }
            } else {
                {{listViewObjName}}.setMode(PullToRefreshBase.Mode.PULL_FROM_START);
            }
            break;
        }

        case {{viewModelClassName}}.ListViewLoadingStatusLoadFailed: {
            if ({{listViewObjName}}.isRefreshing()) {
                {{listViewObjName}}.onRefreshComplete();
            }
            break;
        }
    }
}