private Observable.OnPropertyChangedCallback {{viewModelObjName}}Observer = new Observable.OnPropertyChangedCallback() {
    @Override
    public void onPropertyChanged(Observable sender, int propertyId) {
        {{content}}
    }
};