class ActorsOperator {
    query(params) {
        const endPoint = "mmdb/v6/movie/{mid}/celebrities.json";
        let httpParams = { path: { mid: params["mid"] }, json: { test: params["test"] } }
        return FetchUtil.fetch(config.baseUrl, endPoint, {}, httpParams).map(function (ret) {
            return ret.data;
        })
    }
}