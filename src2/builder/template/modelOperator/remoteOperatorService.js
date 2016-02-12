package {{packageName}}.operator;

import {{packageName}}.base.Collection;
{{importModel}}

import java.util.Map;

import retrofit.Call;
import retrofit.http.GET;
import retrofit.http.Path;
import retrofit.http.QueryMap;

public interface RemoteOperatorService {
    {{content}}
}