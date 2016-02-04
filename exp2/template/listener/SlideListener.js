private SlideSwitch.SlideListener {{listenerName}} = new SlideSwitch.SlideListener() {
    @Override
    public void onOpen() {
        {{onOpen}}
    }

    @Override
    public void onClose() {
        {{onClose}}
    }

    @Override
    public void onClick() {
        {{onClick}}
    }

    @Override
    public void onProgress(int progress) {
        {{onProgress}}
    }
};