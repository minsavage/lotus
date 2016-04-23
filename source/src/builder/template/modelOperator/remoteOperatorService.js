package {{packageName}}.operator;

import {{packageName}}.base.Collection;
{{importModel}}

import java.util.Map;

import retrofit.Call;
import retrofit.http.GET;
import retrofit.http.Body;
import retrofit.http.POST;
import retrofit.http.Path;
import retrofit.http.QueryMap;

public interface RemoteOperatorService {
    {{content}}
}