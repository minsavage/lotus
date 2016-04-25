public void {{actionName}}() {
    if(context.get() == null || {{operatorObjName}} == null) {
        return;
    }

    {{setParameters}}

    {{operatorObjName}}.query({{parameters}}, new Callback<{{resultType}}>() {
        @Override
        public void onSuccess({{resultType}} {{resultObj}}) {
            {{onSuccess}}
        }

        @Override
        public void onFail(Throwable t) {
            Log.e(TAG, t.toString());
            {{onFail}}
        }
    });
}