public void {{actionName}}{{nameWithoutOperatorSuffix}}() {
    if(context.get() == null) {
        return;
    }

    if({{operatorObjName}} == null) {
        {{operatorObjName}} = new {{operatorClassName}}();
    }

    {{operatorObjName}}.{{actionName}}({{parameters}}new {{callback}}<{{model}}>() {
        @Override
        public void onSuccess({{resultType}} {{resultObj}}) {
            {{onSuccess}}
        }

        @Override
        public void onFail(Throwable t) {
            {{onFail}}
        }
    });
}