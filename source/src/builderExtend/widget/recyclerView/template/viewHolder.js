static class {{viewHolderClassName}} extends RecyclerView.ViewHolder {
    public static {{viewHolderClassName}} create(LayoutInflater inflater, ViewGroup parent) {
        {{dataBindingClassName}} binding = DataBindingUtil.inflate(inflater, R.layout.{{layout}}, parent, false);
        {{viewHolderClassName}} holder = new {{viewHolderClassName}}(binding);
        return holder;
    }

    private {{dataBindingClassName}} binding;
    {{declare}}
    public {{viewHolderClassName}}({{dataBindingClassName}} binding) {
        super(binding.getRoot());
        {{init}}
    }

    public void bindTo({{itemClassName}} {{itemObjName}}) {
        binding.setPostItemVM({{itemObjName}});
        binding.executePendingBindings();
    }

    {{event}}
}