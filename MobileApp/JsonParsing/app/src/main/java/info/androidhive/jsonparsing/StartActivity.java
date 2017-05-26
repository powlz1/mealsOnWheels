package info.androidhive.jsonparsing;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.SimpleAdapter;

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
            ArrayList<HashMap<String, String>> tmp = (ArrayList<HashMap<String, String>>) getIntent().getSerializableExtra("array");
            System.out.println(tmp);
            //Map<String,String> map = tmp.get(2);
            // String address = map.get("name");
            // System.out.println(address);
           ListAdapter adapter = new SimpleAdapter(
                StartActivity.this, tmp,
                R.layout.list_item, new String[]{"name", "email",
                "mobile","address"}, new int[]{R.id.name,
                R.id.email, R.id.mobile,R.id.address});

        lv.setAdapter(adapter);
        }


        }


    }


