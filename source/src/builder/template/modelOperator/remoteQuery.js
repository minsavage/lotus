public {{method}} {
    Retrofit retrofit = new Retrofit.Builder()
        .baseUrl("{{{url}}}")
        .addCallAdapterFactory(RxJavaCallAdapterFactory.create())
        .addConverterFactory(GsonConverterUtil.createFactory())
        .build();

    RemoteOperatorService service = retrofit.create(RemoteOperatorService.class);
    return service.{{methodCall}}
        .subscribeOn(Schedulers.newThread())
        .observeOn(AndroidSchedulers.mainThread()){{converter}};
}