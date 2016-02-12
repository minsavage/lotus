public void save(Context context, {{modelClassName}} {{modelObjName}}, Callback callback) {
    if (audio == null) {
        if (callback != null) {
            callback.onFail(null);
        }
        return;
    }

    SharedPreferences.Editor sp = context.getSharedPreferences({{operatorClassName}}.class.getName(), Context.MODE_PRIVATE).edit();
    {{assignment}}
    sp.commit();

    if (callback != null) {
        callback.onSuccess(null);
    }
}