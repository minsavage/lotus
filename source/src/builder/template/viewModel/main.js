package {{packageName}}.viewModel;

import android.content.Context;
import android.databinding.Bindable;
import android.util.Log;
import {{packageName}}.BR;
import {{packageName}}.base.Callback;
import {{packageName}}.base.ViewModel;
import rx.Subscriber;
{{import}}

public class {{className}} extends ViewModel {
    private static final String TAG = "{{className}}";

    public {{className}}(Context c) {
        super(c);
    }

    {{content}}
}