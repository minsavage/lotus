class {{adapterClassName}} extends RecyclerView.Adapter<{{viewHolderClassName}}> {
    LayoutInflater inflater;

    {{adapterClassName}}(Context context) {
        inflater = LayoutInflater.from(context);
    }

    @Override
    public {{viewHolderClassName}} onCreateViewHolder(ViewGroup parent, int viewType) {
        return {{viewHolderClassName}}.create(getContext(), inflater, parent);
    }

    @Override
    public void onBindViewHolder({{viewHolderClassName}} holder, int position) {
        holder.bindTo({{dataSource}}.get(position));
    }

    @Override
    public int getItemCount() {
        return {{dataSource}}.size();
    }
}