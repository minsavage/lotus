public void query{{nameWithoutOperatorSuffix}}() {
    if(context.get() == null) {
        return;
    }

    if({{operatorObjName}} == null) {
        {{operatorObjName}} = new {{operatorClassName}}();
    }

    {{options}}

    {{operatorObjName}}.query({{parameters}}new {{callback}}<{{model}}>() {
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