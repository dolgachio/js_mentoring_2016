package mentoring.plugin;

import android.app.Activity;
import android.content.Intent;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


public class MyCalendar extends CordovaPlugin {
    public static final String ADD_EVENT_ACTION = "addEvent";

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        try {
            if (ADD_EVENT_ACTION.equals(action)) {
                JSONObject arg_object = args.getJSONObject(0);
                Intent calIntent = new Intent(Intent.ACTION_EDIT)
                        .setType("vnd.android.cursor.item/event")
                        .putExtra("beginTime", arg_object.getLong("startDate"))
                        .putExtra("endTime", arg_object.getLong("endDate"))
                        .putExtra("title", arg_object.getString("title"))
                        .putExtra("hasAlarm", 1)
                        .putExtra("description", arg_object.getString("description"));

                this.cordova.getActivity().startActivity(calIntent);
                callbackContext.success();
                return true;
            }
            callbackContext.error("Invalid action");
            return false;
        } catch(Exception e) {
            System.err.println("Exception: " + e.getMessage());
            callbackContext.error(e.getMessage());
            return false;
        }
    }
}
