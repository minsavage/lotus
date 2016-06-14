package {{packageName}}.activity;

import android.os.Bundle;
import {{packageName}}.base.ViewControllerActivity;
import {{packageName}}.viewController.{{viewControllerClass}};

public class {{className}} extends ViewControllerActivity {
    {{viewControllerClass}} {{viewControllerObj}};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        {{viewControllerObj}} = new {{viewControllerClass}}();

        Bundle props = getIntent().getBundleExtra("props");
        if(props != null) {
            {{viewControllerObj}}.setProps(props);
        }

        getViewControllerManager().add({{viewControllerObj}}, null, true);
        setContentView({{viewControllerObj}}.getView());
    }
}