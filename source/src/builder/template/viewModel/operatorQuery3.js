public void {{actionName}}() {
    if(context.get() == null || {{operatorObjName}} == null) {
        return;
    }

    {{setParameters}}

    {{operatorObjName}}.query({{parameters}}).{{subscriber}};
}