private AdapterView.OnItemClickListener {{listenerName}} = new AdapterView.OnItemClickListener() {
    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        position = (int)parent.getAdapter().getItem(position);
        {{content}}
    }
};