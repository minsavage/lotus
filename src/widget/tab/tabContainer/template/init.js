{{objName}} = (ViewPager)view.findViewById(R.id.{{objName}});
{{objName}}.setAdapter(new TabViewControllerPageAdapter(getSubViewControllerMgr()));
{{objName}}.addOnPageChangeListener(onPageChangeListener);