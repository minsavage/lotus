package {{packageName}}.operator;

import com.soundario.dreamcloud.base.Collection;
{{importModel}}

import java.util.Map;

import retrofit.Call;
import retrofit.http.GET;
import retrofit.http.Path;
import retrofit.http.QueryMap;

public interface RemoteOperatorService {
    {{content}}
}