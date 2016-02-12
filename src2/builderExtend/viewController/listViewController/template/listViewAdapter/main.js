class {{className}} extends BaseAdapter {
    LayoutInflater inflater;

    {{className}}(Context c) {
        inflater = LayoutInflater.from(c);
    }

    @Override
    public int getCount() {
        return {{listDataGetter}}.size();
    }

    @Override
    public Object getItem(int position) {
        return position;
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ViewHolder viewHolder;
        if (convertView == null) {
            viewHolder = new ViewHolder();
            convertView = initItemView(viewHolder, parent);
        }

        {{modelClassName}} {{modelObjName}} = {{listDataGetter}}.get(position);
        viewHolder = (ViewHolder)convertView.getTag();
        viewHolder._position = position;
        {{assignment}}

        return convertView;
    }

    private View initItemView(ViewHolder viewHolder, ViewGroup parent) {
        WeakReference<ViewHolder> ref = new WeakReference<ViewHolder>(viewHolder);
        View view = inflater.inflate(R.layout.{{layoutId}}, parent, false);
        view.setTag(viewHolder);
        {{init}}
        return view;
    }

    {{event}}

    private int getPosition(View view) {
        WeakReference ref = (WeakReference)view.getTag();
        if (ref.get() != null) {
            return ((ViewHolder)ref.get())._position;
        }
        else {
            return -1;
        }
    }

    private {{modelClassName}} getModel(View view) {
        int p = getPosition(view);
        if (p == -1) {
            return null;
        }
        else {
            return {{listDataGetter}}.get(p);
        }
    }

    class ViewHolder {
        int _position;
        {{viewHolder}}
    }
}