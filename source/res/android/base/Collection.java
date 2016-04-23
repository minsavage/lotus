package {{packageName}}.base;

import java.util.ArrayList;

/**
 * Created by danney on 16/1/31.
 */
public class Collection<T> extends ArrayList<T> {
    private int totalCount;

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }
}