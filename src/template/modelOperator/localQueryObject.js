public void query(Context context, Callback<{{modelClassName}}> callback) {
    SharedPreferences sp = context.getSharedPreferences({{operatorClassName}}.class.getName(), Context.MODE_PRIVATE);

    boolean __exist = sp.getBoolean("__exist", false);
    if (!__exist) {
        if (callback != null) {
            callback.onSuccess(null);
        }
        return;
    }

    {{modelClassName}} {{modelObjName}} = new {{modelClassName}}();
    {{assignment}}

    if (callback != null) {
        callback.onSuccess({{modelObjName}});
    }
}