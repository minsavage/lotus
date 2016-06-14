class {{adapterClassName}} extends RecyclerView.Adapter<RecyclerView.ViewHolder> {
    LayoutInflater inflater;
    ViewControllerManager viewControllerMgr;

    {{adapterClassName}}(Context context, ViewControllerManager vcm) {
        inflater = LayoutInflater.from(context);
        viewControllerMgr = vcm;
    }

    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        if (viewType == 0) {
            return {{staticViewHolderClassName}}.create(viewControllerMgr);
        }
        else {
            return {{viewHolderClassName}}.create(getContext(), inflater, parent);
        }
    }

    @Override
    public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
        if (position >0) {
            (({{viewHolderClassName}})holder).bindTo({{dataSource}}.get(position-1));
        }
    }

    @Override
    public int getItemViewType(int position) {
        if(position == 0) {
            return 0;
        }
        else {
            return 1;
        }
    }

    @Override
    public int getItemCount() {
        return {{dataSource}}.size() + 1;
    }
}

static class {{staticViewHolderClassName}} extends RecyclerView.ViewHolder {
    public static {{staticViewHolderClassName}} create(ViewControllerManager viewControllerMgr) {
        {{staticFirstItem}} {{staticFirstItemObj}} = new {{staticFirstItem}}();
        viewControllerMgr.add({{staticFirstItemObj}}, null, true);
        return new {{staticViewHolderClassName}}({{staticFirstItemObj}}.getView());
    }

    public {{staticViewHolderClassName}}(View v) {
        super(v);
    }
}