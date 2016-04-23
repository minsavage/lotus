/**
 * Created by danney on 16/4/18.
 */
class Builder {
    constructor() {
        this.importRecorder = new ImportRecorder();
    }

    parse() {
        check();
        importUtil.fill(this.importRecorder, model.import);
    }

    check() {

    }
}