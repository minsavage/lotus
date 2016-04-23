package {{packageName}}.viewModel;

import android.content.Context;
import android.databinding.Bindable;
import android.util.Log;
import {{packageName}}.BR;
import {{packageName}}.base.ViewModel;
{{import}}

public class {{className}} extends ViewModel {
    private static final String TAG = "{{className}}";

    public {{className}}(Context c) {
        super(c);
    }

    {{content}}
}