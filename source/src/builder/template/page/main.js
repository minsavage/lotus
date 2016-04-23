package {{packageName}}.activity;

import {{packageName}}.base.ViewControllerActivity;
import {{packageName}}.viewController.{{viewControllerName}};

public class {{className}} extends ViewControllerActivity {

    @Override
    public Class getViewControllerClass() {
        return {{viewControllerName}}.class;
    }
}