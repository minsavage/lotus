public void query(Map<String, Object> parameters, final Callback<{{resultClassName}}> callback) {
    Retrofit retrofit = new Retrofit.Builder()
        .baseUrl("{{{url}}}")
        .addConverterFactory(GsonConverterUtil.createFactory())
        .build();

    RemoteOperatorService service = retrofit.create(RemoteOperatorService.class);
    final Call<{{resultClassName}}> call = service.{{queryFuncName}}(parameters);

    call.enqueue(new retrofit.Callback<{{resultClassName}}>() {
        @Override
        public void onResponse(Response<{{resultClassName}}> response, Retrofit retrofit) {
            if (response.isSuccess()) {
                {{resultClassName}} {{resultObjectName}} = response.body();
                if (callback != null) {
                    callback.onSuccess({{resultObjectName}});
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