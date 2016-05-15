package com.example.zouqin.recyclerviewdemo;

import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import java.util.zip.Inflater;

public class MainActivity extends AppCompatActivity {
    private RecyclerView recyclerView;
    private RecyclerViewAdapter recyclerViewAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        recyclerView = (RecyclerView) this.findViewById(R.id.recyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerViewAdapter = new RecyclerViewAdapter(getContext());
        recyclerView.setAdapter(recyclerViewAdapter);
    }

    class RecyclerViewAdapter extends RecyclerView.Adapter<MyViewHolder> {
        Context context;

        public RecyclerViewAdapter(Context c) {
            context = c;
        }

        @Override
        public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            LayoutInflater inflater = LayoutInflater.from(context);
            View v = (View)inflater.inflate(R.layout.item, parent, false);
            MyViewHolder holder = new MyViewHolder(v);
            return holder;
        }

        @Override
        public void onBindViewHolder(MyViewHolder holder, int position) {

        }

        @Override
        public int getItemCount() {
            return 0;
        }
    }

    class MyViewHolder extends RecyclerView.ViewHolder {
        private View view;

        private ImageView ivBkg;

        public MyViewHolder(View v) {
            super(v);

            ivBkg = view.findViewById(R.id.ivBkg);
            ivBkg.setOnClickListener(ivBkgOnClickListner);
        }

        private View.OnClickListener ivBkgOnClickListner = new View.OnClickListener() {
            @Override
            public void onClick(View v) {

            }
        };
    }
}