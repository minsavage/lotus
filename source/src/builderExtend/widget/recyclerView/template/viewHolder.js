static class {{viewHolderClassName}} extends RecyclerView.ViewHolder {
    public static {{viewHolderClassName}} create(Context c, LayoutInflater inflater, ViewGroup parent) {
        {{bindingClassName}} binding = {{bindingClassName}}.inflate(inflater, parent, false);
        {{viewHolderClassName}} holder = new {{viewHolderClassName}}(c, binding);
        return holder;
    }

    private WeakReference<Context> context;
    private {{bindingClassName}} binding;
    private {{itemClassName}} {{itemObjName}};
    {{memberVariable}}

    public {{viewHolderClassName}}(Context c, {{bindingClassName}} binding) {
        super(binding.getRoot());
        context = new WeakReference<Context>(c);
        this.binding = binding;
        {{init}}
    }

    public void bindTo({{itemClassName}} {{itemObjName}}) {
        this.{{itemObjName}} = {{itemObjName}};
        binding.{{setFuncName}}({{itemObjName}});
        binding.executePendingBindings();
    }

    private Context getContext() {
        return context.get();
    }

    {{event}}
}