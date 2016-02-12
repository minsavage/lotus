{{listViewObjName}} = (PullToRefreshListView)view.findViewById(R.id.{{listViewObjName}});
adapter = new {{className}}Adapter(getContext());
{{listViewObjName}}.setAdapter(adapter);
{{listViewObjName}}.setOnRefreshListener(onRefreshListener);
{{listViewObjName}}.setOnScrollListener(onScrollListener);