class RecyclerViewAdapter extends RecyclerView.Adapter<ItemViewHolder> {
    LayoutInflater inflater;

    RecyclerViewAdapter(Context context) {
        inflater = LayoutInflater.from(context);
    }

    @Override
    public ItemViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        return ItemViewHolder.create(inflater, parent);
    }

    @Override
    public void onBindViewHolder(ItemViewHolder holder, int position) {
        holder.bindTo(weibosVM.getWeibos().get(position));
    }

    @Override
    public int getItemCount() {
        return weibosVM.getWeibos().size();
    }
}