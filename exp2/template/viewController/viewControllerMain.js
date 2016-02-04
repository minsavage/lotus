package {{packageName}}.viewController;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.soundario.base.ViewController;
import com.soundario.base.ViewModelMgr;

import java.util.Observable;
import java.util.Observer;

{{import}}


public class {{viewControllerName}} extends ViewController {
    private static final String TAG = "{{viewControllerName}}";

    {{{variableStmt}}}

    @Override
    public View onCreate(LayoutInflater inflater, ViewGroup container) {
        View view = inflater.inflate(R.layout.{{layoutFileName}}, container);

        {{viewModelInit}}

        return view;
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        {{viewModelDestroy}}
    }

    {{viewModelObserverStmt}}
}