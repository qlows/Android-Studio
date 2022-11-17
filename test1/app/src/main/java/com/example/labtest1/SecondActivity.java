package com.example.labtest1;

import static com.example.labtest1.R.*;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.List;

public class SecondActivity extends AppCompatActivity {

    String[] colours = {"Green", "Blue", "Red"};
    ListView listview;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(layout.activity_second);

        ListView listView = findViewById(R.id.listview);
        //final ArrayList<String> colours = new ArrayList<>();
        ArrayAdapter arrayAdapter = new ArrayAdapter(this, android.R.layout.simple_list_item_1, colours);
        listView.setAdapter(arrayAdapter);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @SuppressLint("MissingInflatedId")
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                String bgColour = colours[position];
                changeColour(bgColour);
            }
        });
    }

    //Set the background colour
    void setColour(int color){
        View view = this.getWindow().getDecorView();
        view.setBackgroundColor(color);
    }

    //Change the background colour
    public void changeColour(String colours){
        if(colours == "Blue"){
            setColour(Color.BLUE);
        } else if(colours == "Red"){
            setColour(Color.RED);
        } else {
            setColour(Color.GREEN);
        }
    }

    //Selected item
    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                this.finish();
                return true;
        }
        return super.onOptionsItemSelected(item);
    }
}