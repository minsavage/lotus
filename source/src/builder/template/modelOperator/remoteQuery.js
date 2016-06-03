public Observable<{{resultClassName}}> query(Map<String, Object> parameters) {
    Retrofit retrofit = new Retrofit.Builder()
        .baseUrl("{{{url}}}")
        .addCallAdapterFactory(RxJavaCallAdapterFactory.create())
        .addConverterFactory(GsonConverterUtil.createFactory())
        .build();

    RemoteOperatorService service = retrofit.create(RemoteOperatorService.class);
    return service.{{queryFuncName}}(parameters)
        .subscribeOn(Schedulers.newThread())
        .observeOn(AndroidSchedulers.mainThread()){{converter}};
}