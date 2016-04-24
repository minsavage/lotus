package com.lotus.tn.operator;

import com.lotus.tn.base.Collection;
import com.lotus.tn.model.User;

import java.util.Map;

import retrofit.Call;
import retrofit.http.GET;
import retrofit.http.Body;
import retrofit.http.POST;
import retrofit.http.Path;
import retrofit.http.QueryMap;

public interface RemoteOperatorService {
    @POST("/users")
    Call<Collection<User>> queryUser(@Body Map<String, Object> parameters);
}