private {{className}} {{objName}};

private void setPagingOffset({{listClassName}} {{listObjName}}) {
    if({{listObjName}}.size() == 0) {
        return;
    }
    {{objName}} = {{listObjName}}.get({{listObjName}}.size()-1).get{{property}}();
}