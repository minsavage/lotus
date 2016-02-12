package {{packageName}}.viewController;

import android.content.Context;
import android.databinding.DataBindingUtil;
import android.databinding.Observable;
import android.os.Bundle;
import android.support.v4.view.ViewPager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RadioButton;
import android.widget.RadioGroup;

import {{packageName}}.BR;
import {{packageName}}.R;
import {{packageName}}.base.ViewController;
import {{packageName}}.base.ViewControllerMgr;
import {{packageName}}.base.ViewModelMgr;
import {{packageName}}.base.ViewControllerPageAdapter;
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

    private RadioGroup.OnCheckedChangeListener onCheckedChangeListener = new RadioGroup.OnCheckedChangeListener() {
    @Override
        public void onCheckedChanged(RadioGroup group, int checkedId) {
            RadioButton btn = (RadioButton) group.findViewById(checkedId);
            int index = 0;
            try {
                index = Integer.valueOf((String) btn.getTag());
            }
            catch (NumberFormatException e) {

            }
            if({{tabContainerName}}.getCurrentItem() != index) {
                {{tabContainerName}}.setCurrentItem(index);
            }
        }
    };

    private ViewPager.OnPageChangeListener onPageChangeListener = new ViewPager.OnPageChangeListener() {
        @Override
        public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {}

        @Override
        public void onPageSelected(int position) {
            getButton(position).setChecked(true);
        }

        @Override
        public void onPageScrollStateChanged(int state) {}
    };

    private ViewController getTabViewController(int position) {
        ViewController vc = null;
        {{getTabViewController}}
        return vc;
    }

    private RadioButton getButton(int position) {
        RadioButton _btn = null;
        {{getButton}}
        return _btn;
    }

    private int getTabCount() {
        return {{tabCount}};
    }

    class TabViewControllerPageAdapter extends ViewControllerPageAdapter {
        public TabViewControllerPageAdapter(ViewControllerMgr vcm) {
            super(vcm);
        }

        @Override
        public ViewController getItem(int position) {
            return getTabViewController(position);
        }

        @Override
        public int getCount() {
            return getTabCount();
        }
    }

    {{viewModelObserverStmt}}
}