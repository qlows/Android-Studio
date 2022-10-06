package com.example.lab5;

import androidx.appcompat.app.AppCompatActivity;

import android.content.ContentValues;
import android.content.Context;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    SharedPreferences pref;
    NamesDbHelper dbHelper;
    SQLiteDatabase db;

    void initDatabase(SQLiteDatabase db){
        ContentValues values = new ContentValues();
        values.put(NameContract.NameEntry.COLUMN_NAME_NAME, "James");
        Long id = db.insert(NameContract.NameEntry.TABLE_NAME,
                null, values);
        Log.d("DATABASE", "Row added with id = " + id);

        values.put(NameContract.NameEntry.COLUMN_NAME_NAME, "Clara");
        id = db.insert(NameContract.NameEntry.TABLE_NAME,
                null, values);
        Log.d("DATABASE", "Row added with id = " + id);
    }

    long getNamesCount(SQLiteDatabase db){
        long cnt = 0;

        String query = "SELECT COUNT(*) as CNT FROM " + NameContract.NameEntry.TABLE_NAME;
        Cursor c = db.rawQuery(query, null);

        while (c.moveToNext()){
            int id = c.getColumnIndex("CNT");
            cnt = c.getLong(id);

        }

        return cnt;
    }

    List<NameEntity> getAllNames(SQLiteDatabase db){
        List<NameEntity> list = new ArrayList<>();

        String[] projection = {
                NameContract.NameEntry._ID,
                NameContract.NameEntry.COLUMN_NAME_NAME
        };

        String sortOrder = NameContract.NameEntry.COLUMN_NAME_NAME + " ASC";

        Cursor c = db.query(
                NameContract.NameEntry.TABLE_NAME,
                projection, null, null,
                null, null,
                sortOrder
        );

        while(c.moveToNext()){
            long id = c.getLong(c.getColumnIndexOrThrow(NameContract.NameEntry._ID));
            String name = c.getString(
                    c.getColumnIndexOrThrow(NameContract.NameEntry.COLUMN_NAME_NAME));
            NameEntity item = new NameEntity(id, name);
            list.add(item);
        }
        return list;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        pref = getSharedPreferences(getString(R.string.preferences_name), Context.MODE_PRIVATE);

        TextView txt = findViewById(R.id.txt_preferences);
        if(pref.contains(getString(R.string.pref_key))) {
            String pref_value = pref.getString(getString(R.string.pref_key), "");
            txt.setText(pref_value);
        }
        else{
            txt.setText("No User Found");
            SharedPreferences.Editor editor = pref.edit();
            editor.putString(getString(R.string.pref_key), "John");
            editor.apply();
        }

        dbHelper = new NamesDbHelper(this);
        db = dbHelper.getWritableDatabase();

        if (getNamesCount(db) == 0){
            initDatabase(db);
        }

        List<NameEntity> l = getAllNames(db);
        String s = "";
        for (NameEntity i:l){
            Log.d("DATABASE-RESULT", i.getId() + " " + i.getName());
            s += i.getId() + i.getName() + "\n";
        }
        txt.setText(s);
    }
}