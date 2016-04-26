package com.lotus.tn.operator;

import com.lotus.tn.model.User;
import com.lotus.tn.base.Collection;
import com.lotus.tn.base.Callback;
import com.lotus.tn.base.GsonConverterUtil;

import android.util.Log;

import java.util.Map;

import retrofit.Call;
import retrofit.Response;
import retrofit.Retrofit;

public class UsersOperator {
    private static final String TAG = "UsersOperator";

    public void query(Map<String, Object> parameters, final Callback<Collection<User>> callback) {
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://www.2go.cat/")
                .addConverterFactory(GsonConverterUtil.createFactory())
                .build();

        RemoteOperatorService service = retrofit.create(RemoteOperatorService.class);
        final Call<Collection<User>> call = service.queryUser(parameters);

        call.enqueue(new retrofit.Callback<Collection<User>>() {
            @Override
            public void onResponse(Response<Collection<User>> response, Retrofit retrofit) {
                if (response.isSuccess()) {
                    Collection<User> users = response.body();
                    if (callback != null) {
                        callback.onSuccess(users);
                    }
                } else {
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
}