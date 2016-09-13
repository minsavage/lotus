import {observable, transaction} from 'mobx'

export default class ActorsViewModel {
    @observable actors = [];
    @observable mid = 0;
    actorsOperator = new ActorsOperator();

    queryActors() {
        let params = {
            mid: this.mid
        }
        this.actorsOperator.query(params);
    }
}