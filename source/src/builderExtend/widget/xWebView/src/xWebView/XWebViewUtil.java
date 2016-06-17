package com.y2go.ich.widget.xWebView;

import android.app.Activity;
import android.content.Context;
import android.content.res.Resources;
import android.databinding.BindingAdapter;
import android.net.Uri;
import android.util.DisplayMetrics;
import android.view.Display;
import android.view.WindowManager;
import android.webkit.WebView;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by danney on 16/5/21.
 */
public class XWebViewUtil {
    @BindingAdapter({"content"})
    public static void setUri(WebView view, String content) {
        setPost(view, content);
    }

    static private void setPost(WebView webView, String content) {
        if (content == null) {
            return;
        }

        String[] list = content.split("\\r\\n|\\n|\\r");

        String html = "";
        Pattern pattern = Pattern.compile("^http:\\/\\/.*\\.(jpg|png|gif)$");
        for (int i = 0; i < list.length; i++) {
            String str = null;
            Matcher matcher = pattern.matcher(list[i]);
            if (matcher.matches()) {
                //str = "<img style=\"max-width:100%;height:auto;margin:10px\" src=\"" + list[i] + "\" />";
                str = "<img  src=\"" + list[i] + "\" />";
                //str = "<img style='max-width:" + width + "px' src=\"" + list[i] + "\" />";
            } else {
                str = "<p>" + list[i] + "</p>";
            }
            html += str;
        }

        webView.loadDataWithBaseURL(null, getHtmlData(html), "text/html", "UTF-8", null);
    }

    static private String getHtmlData(String bodyHTML) {
        String head = "<head><style>img{max-width: 98%; width:auto; height: auto;margin-bottom:10px}</style></head>";
        return "<html>" + head + "<body>" + bodyHTML + "</body></html>";
    }
}