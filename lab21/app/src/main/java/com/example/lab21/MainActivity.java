package com.example.lab21;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import java.util.Locale;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button btn = findViewById(R.id.button);
        EditText input = findViewById(R.id.input);
        TextView out = findViewById(R.id.output);

        out.setText(R.string.empty);

        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String txt = input.getText().toString();
//                if(txt.isEmpty()){
//                    txt = "0";
//                }
//                float val = Float.valueOf(txt);
//                float res = val * 100;
//                out.setText(res + " cm");

                String res = txt.toUpperCase(Locale.ROOT);
                out.setText(res);
            }
        });
    }
}