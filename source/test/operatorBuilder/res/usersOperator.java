package com.lotus.tn.operator;

import com.lotus.tn.model.User;
import com.lotus.tn.base.Collection;
import com.lotus.tn.base.GsonConverterUtil;

import android.util.Log;

import java.util.Map;

import retrofit.Call;
import retrofit.Response;
import retrofit.Retrofit;
import rx.Observable;;

public class UsersOperator {
    private static final String TAG = "UsersOperator";

    public Observable<Collection<User>> query(Map<String, Object> parameters) {
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://www.2go.cat/")
                .addConverterFactory(GsonConverterUtil.createFactory())
                .build();

        RemoteOperatorService service = retrofit.create(RemoteOperatorService.class);
        return service.queryUser(parameters);
    }
}