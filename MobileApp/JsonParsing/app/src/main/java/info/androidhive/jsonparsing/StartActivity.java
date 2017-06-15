package info.androidhive.jsonparsing;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.SimpleAdapter;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * start Avtivity
 *
 */
public class StartActivity extends AppCompatActivity {

    Button buttonStart;
    Button buttonStartMap;
    private ProgressDialog pDialog;
    private ListView lv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.start_screen);
        lv = (ListView) findViewById(R.id.simpleListView);

        /**
         * Updating parsed JSON data into ListView
         * */
        Intent intent = getIntent();
        if (intent != null) {
            final ArrayList<HashMap<String, String>> tmp = (ArrayList<HashMap<String, String>>) getIntent().getSerializableExtra("array");
            System.out.println(tmp);
           ListAdapter adapter = new SimpleAdapter(
                   StartActivity.this, tmp,
                R.layout.list_item, new String[]{"firstName","lastName", "email",
                "address","phone"}, new int[]{R.id.name,R.id.lastName,
                R.id.email, R.id.address,R.id.mobile,});

        lv.setAdapter(adapter);
            lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> adapterView, View view, int position, long l) {
                    String id=tmp.get(position).get("id");
                    Toast.makeText(getApplicationContext(),
                            "customer id is - "  + id,
                            Toast.LENGTH_LONG)
                            .show();
                }
            });
        }


        }


    }


