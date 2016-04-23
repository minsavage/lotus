adapter = new {{className}}Adapter(getContext());
{{listViewObjName}} = (PullToRefreshListView)view.findViewById(R.id.{{listViewObjName}});
{{listViewObjName}}.setAdapter(adapter);
{{listViewObjName}}.setOnRefreshListener(onRefreshListener);
{{listViewObjName}}.setOnScrollListener(onScrollListener);