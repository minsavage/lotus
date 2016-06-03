public Observable<User> query(Map<String, Object> parameters) {
    Retrofit retrofit = new Retrofit.Builder()
        .baseUrl("http://www.2go.cat/")
        .addConverterFactory(GsonConverterUtil.createFactory())
        .build();

    RemoteOperatorService service = retrofit.create(RemoteOperatorService.class);
    return service.queryUser(parameters);
}