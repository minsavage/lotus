package com.y2go.ich.widget.xImageView;

import android.databinding.BindingAdapter;
import android.net.Uri;

import com.facebook.drawee.view.SimpleDraweeView;

/**
 * Created by danney on 16/5/21.
 */
public class XImageViewUtil {
    @BindingAdapter({"uri"})
    public static void setUri(SimpleDraweeView view, String url) {
        Uri uri = Uri.parse(url);
        view.setImageURI(uri);
    }
}