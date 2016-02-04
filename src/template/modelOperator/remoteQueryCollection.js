public void query(Map<String, String> options, final CollectionCallback<{{modelClassName}}> callback) {
    Retrofit retrofit = new Retrofit.Builder()
        .baseUrl("{{{url}}}")
        .addConverterFactory(GsonConverterFactory.create())
        .build();

    RemoteOperatorService service = retrofit.create(RemoteOperatorService.class);
    final Call<Collection<{{modelClassName}}>> call = service.get{{modelClassName}}s(options);

    call.enqueue(new Callback<Collection<{{modelClassName}}>>() {
        @Override
        public void onResponse(Response<Collection<{{modelClassName}}>> response, Retrofit retrofit) {
            if (response.isSuccess()) {
                Collection<{{modelClassName}}> {{modelObjName}}s = response.body();

                try {
                    String countStr = response.headers().get("X-Total-Count");
                    int totalCount = Integer.valueOf(countStr);
                    {{modelObjName}}s.setTotalCount(totalCount);
                }
                catch (NumberFormatException e) {

                }

                if (callback != null) {
                    callback.onSuccess({{modelObjName}}s);
                }
            }
            else {
                if (callback != null) {
                    callback.onFail(null);
                }
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