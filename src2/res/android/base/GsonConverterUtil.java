package com.soundario.weibo.base;

import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;

import java.lang.reflect.Type;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

import retrofit.GsonConverterFactory;

/**
 * Created by danney on 16/2/22.
 */
public class GsonConverterUtil {
    public static GsonConverterFactory createFactory() {
        GsonBuilder gb = new GsonBuilder().registerTypeAdapter(Date.class, new JsonDeserializer<Date>() {
            @Override
            public Date deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
                DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
                df.setTimeZone(TimeZone.getTimeZone("UTC"));

                try {
                    return df.parse(json.getAsString());
                } catch (ParseException e) {
                    throw new JsonParseException(e);
                }
            }
        });

        return GsonConverterFactory.create(gb.create());
    }
}