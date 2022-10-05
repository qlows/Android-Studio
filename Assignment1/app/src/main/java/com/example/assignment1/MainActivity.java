package com.example.assignment1;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;


public class MainActivity extends AppCompatActivity {

    EditText no_of_hours, hourly_rate;
    TextView payment;
    TextView tax;
    TextView total_pay;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //Inputs
        no_of_hours = findViewById(R.id.no_of_hours_input);
        hourly_rate = findViewById(R.id.hourly_rate_input);

        // Outputs
        payment = findViewById(R.id.payment_out);
        tax = findViewById(R.id.tax_out);
        total_pay = findViewById(R.id.payment_out);
    }

    public void calculator(View view) {

            double noh = Double.parseDouble(no_of_hours.getText().toString());
            double hr = Double.parseDouble(hourly_rate.getText().toString());

            double payment = 0;
            double total_pay = 0;
            double tax = 0;

            if (noh <= 40) {
                payment = noh * hr;
                total_pay = payment;
            } else {
                payment = (noh - 40) * hr * 1.5 + 40 * hr;
            }

            tax = total_pay * 0.18;

            this.payment.setText(String.format("%.2f", payment));
            this.total_pay.setText(String.format("%.2f", total_pay));
            this.tax.setText(String.format("%.2f", tax));
    }

}