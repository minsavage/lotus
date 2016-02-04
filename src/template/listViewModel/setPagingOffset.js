private {{className}} {{objName}};

private void setPagingOffset({{listClassName}} {{listObjName}}) {
    {{objName}} = {{listObjName}}.get({{listObjName}}.size()-1).get{{property}}();
}