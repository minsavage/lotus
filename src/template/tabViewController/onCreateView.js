{{tabContainer}} = (ViewPager)view.findViewById(R.id.{{tabContainer}});
{{tabContainer}}.setAdapter(new TabViewControllerPageAdapter(getSubViewControllerMgr()));
{{tabContainer}}.addOnPageChangeListener(onPageChangeListener);
{{tabBar}} = (RadioGroup)view.findViewById(R.id.{{tabBar}});
{{tabBar}}.setOnCheckedChangeListener(onCheckedChangeListener);