subscribe(new Subscriber<{{resultType}}>() {
    @Override
    public void onCompleted() {}

    @Override
    public void onError(Throwable e) {
        Log.e(TAG, e.toString());
        {{onFail}}
    }

    @Override
    public void onNext({{resultType}} {{resultObj}}) {
        {{onSuccess}}
    }
})