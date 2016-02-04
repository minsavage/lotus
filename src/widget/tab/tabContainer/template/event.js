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
    return TabViewController.this.getCount();
}
}