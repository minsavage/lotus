package {{packageName}}.viewController;

import android.content.Context;
import android.databinding.DataBindingUtil;
import android.databinding.Observable;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import {{packageName}}.BR;
import {{packageName}}.R;
import {{packageName}}.base.ViewController;
import {{packageName}}.base.ViewModelMgr;
import {{packageName}}.databinding.{{dataBindingName}};
{{import}}


public class {{className}} extends ViewController {
    private static final String TAG = "{{className}}";
    private {{dataBindingName}} binding;
    {{{variableStmt}}}

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        {{onCreate}}
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        binding = DataBindingUtil.inflate(inflater, R.layout.{{layoutFileName}}, container, true);
        binding.set{{viewModelObjNameWithFirstUppercase}}({{viewModelObjName}});
        View view = binding.getRoot();
        {{onCreateView}}
        return view;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        {{viewModelDestroy}}
    }

    {{viewModelObserverStmt}}
}