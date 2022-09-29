package com.example.lab4;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;
import android.view.MotionEvent;
import android.view.View;

public class MainActivity extends AppCompatActivity implements MovieFragment.MovieListListener{

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        DetailsFragment df = DetailsFragment.newInstance("1");
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.details_fragment, df).commit();
    }

    @Override
    public void onItemClick(int pos) {
        DetailsFragment df = DetailsFragment.newInstance(String.valueOf(pos));
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.details_fragment, df).commit();
    }
}