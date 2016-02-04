package com.soundario.dreamcloud.operator;

import com.soundario.dreamcloud.base.DJListCallback;
import com.soundario.dreamcloud.RemoteOperatorService;
import com.soundario.dreamcloud.define.DJException;
import com.soundario.dreamcloud.model.Audio;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import retrofit.Call;
import retrofit.Callback;
import retrofit.GsonConverterFactory;
import retrofit.Response;
import retrofit.Retrofit;


public class AudioListOperator {
    public void query( final DJListCallback<Audio> callback) {
    Retrofit retrofit = new Retrofit.Builder()
        .baseUrl(htt://www.soundario.com/)
        .addConverterFactory(GsonConverterFactory.create())
        .build();

    Map<String, String> map = new HashMap<>();

    RemoteOperatorService service = retrofit.create(RemoteOperatorService.class);
    final Call<List<Audio>> call = service.getAudios(map);

    call.enqueue(new Callback<List<Audio>>() {
        @Override
        public void onResponse(Response<List<Audio>> response, Retrofit retrofit) {
            List<Audio> audios = response.body();
            if (callback != null) {
                callback.done(audios, null);
            }
        }

        @Override
        public void onFailure(Throwable t) {
            if (callback != null) {
                callback.done(null, new DJException(0));
            }
        }
    });
}
}