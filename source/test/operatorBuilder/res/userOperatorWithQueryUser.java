public void query(Map<String, Object> parameters, final Callback<User> callback) {
    Retrofit retrofit = new Retrofit.Builder()
        .baseUrl("http://www.2go.cat/")
        .addConverterFactory(GsonConverterUtil.createFactory())
        .build();

    RemoteOperatorService service = retrofit.create(RemoteOperatorService.class);
    final Call<User> call = service.queryUser(parameters);

    call.enqueue(new retrofit.Callback<User>() {
        @Override
        public void onResponse(Response<User> response, Retrofit retrofit) {
            if (response.isSuccess()) {
                User user = response.body();
                if (callback != null) {
                    callback.onSuccess(user);
                }
            }
            else {
                Log.e(TAG, "response error, code:" + response.code());
                onFailure(null);
            }
        }

        @Override
        public void onFailure(Throwable t) {
            if (callback != null) {
                callback.onFail(t);
            }
        }
    });
}