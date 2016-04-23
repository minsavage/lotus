private {{operatorClassName}} {{operatorObjName}} = new {{operatorClassName}}();

public void query{{OperatorNameWithoutSuffix}}() {
    {{operatorObjName}}.query(null, new CollectionCallback<{{modelClassName}}>(){
        @Override
        public void onSuccess(Collection<{{modelClassName}}> list) {
            {{listObjName}} = list;
            setPagingOffset(list);
            setLoadMoreEnable(list);
            setListViewLoadingStatus(ListViewLoadingStatusLoadSucceed);
        }

        @Override
        public void onFail(Throwable t) {
            Log.e(TAG, t.toString());
            setListViewLoadingStatus(ListViewLoadingStatusLoadFailed);
        }
    });
}

public void query{{OperatorNameWithoutSuffix}}More() {
    HashMap<String, String> options = new HashMap<String, String>();
    options.put("{{sortingFieldKey}}", String.valueOf({{sortingFieldValue}}));

    {{operatorObjName}}.query(options, new CollectionCallback<{{modelClassName}}>(){
        @Override
        public void onSuccess(Collection<{{modelClassName}}> list) {
            {{listObjName}}.addAll(list);
            setPagingOffset(list);
            setLoadMoreEnable(list);
            setListViewLoadingStatus(ListViewLoadingStatusLoadSucceed);
        }

        @Override
        public void onFail(Throwable t) {
            Log.e(TAG, t.toString());
            setListViewLoadingStatus(ListViewLoadingStatusLoadFailed);
        }
    });
}