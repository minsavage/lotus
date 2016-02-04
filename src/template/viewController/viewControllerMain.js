package {{packageName}}.viewController;

import android.databinding.DataBindingUtil;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import {{packageName}}.base.ViewController;
import {{packageName}}.base.ViewModelMgr;
import {{packageName}}.R;

import java.util.Observable;
import java.util.Observer;

{{import}}


public class {{viewControllerName}} extends ViewController {
    private static final String TAG = "{{viewControllerName}}";
    private {{bindingClassName}} binding;
    {{{variableStmt}}}

    @Override
    public View onCreate(LayoutInflater inflater, ViewGroup container) {
        binding = DataBindingUtil.setContentView(this, R.layout.{{layoutFileName}});
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