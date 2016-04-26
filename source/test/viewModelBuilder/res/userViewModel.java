package com.lotus.tn.viewModel;

import android.content.Context;
import android.databinding.Bindable;
import android.util.Log;
import com.lotus.tn.BR;
import com.lotus.tn.base.Callback;
import com.lotus.tn.base.ViewModel;
import com.lotus.tn.model.User;
import com.lotus.tn.operator.UserOperator;
import java.util.HashMap;

public class UserViewModel extends ViewModel {
    private static final String TAG = "UserViewModel";

    public UserViewModel(Context c) {
        super(c);
    }

    private String userId;

    @Bindable
    public String getUserId() {
        return userId;
    }

    @Bindable
    public void setUserId(String userId) {
        this.userId = userId;
        notifyPropertyChanged(BR.userId);
    }

    private User user;

    @Bindable
    public User getUser() {
        return user;
    }

    @Bindable
    public void setUser(User user) {
        this.user = user;
        notifyPropertyChanged(BR.user);
    }

    private UserOperator userOperator;

    public void queryUser() {
        if(context.get() == null || userOperator == null) {
            return;
        }

        HashMap<String, Object> map = new HashMap<>();
        map.put("userId", userId);

        userOperator.query(map, new Callback<User>() {
            @Override
            public void onSuccess(User user) {

            }

            @Override
            public void onFail(Throwable t) {
                Log.e(TAG, t.toString());

            }
        });
    }
}