package mentoring.plugin;

import android.content.ContentValues;
import android.provider.CalendarContract.Events;
import android.provider.CalendarContract.Reminders;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.content.Context;
import android.content.ContentResolver;
import java.util.TimeZone;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class MyCalendar extends CordovaPlugin {
    public static final String ADD_EVENT_ACTION = "addEvent";
    public static final String ADD_EVENT_INTERACTIVELY = "addEventInteractively";

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        try {
            if(ADD_EVENT_ACTION.equals(action)) {
                ContentResolver cr = MyCalendar.this.cordova.getActivity().getContentResolver();
                JSONObject arg_object = args.getJSONObject(0);
                final ContentValues event = new ContentValues();
                Uri baseUri;
                Uri customEvent;
                long eventID;
                ContentValues reminders;

                event.put(Events.CALENDAR_ID, 1);
                event.put(Events.TITLE, arg_object.getString("title"));
                event.put(Events.DESCRIPTION, arg_object.getString("description"));

                event.put(Events.DTSTART, arg_object.getLong("startDate"));
                event.put(Events.DTEND, arg_object.getLong("endDate"));
                event.put(Events.HAS_ALARM, 1);

                String timeZone = TimeZone.getDefault().getID();
                event.put(Events.EVENT_TIMEZONE, timeZone);

                if (Build.VERSION.SDK_INT >= 8) {
                    baseUri = Uri.parse("content://com.android.calendar/events");
                } else {
                    baseUri = Uri.parse("content://calendar/events");
                }

                customEvent = cr.insert(baseUri, event);

                eventID = Long.parseLong(customEvent.getLastPathSegment());
                reminders = new ContentValues();
                reminders.put(Reminders.EVENT_ID, eventID);
                reminders.put(Reminders.METHOD, Reminders.METHOD_ALERT);
                reminders.put(Reminders.MINUTES, 5);

                cr.insert(Reminders.CONTENT_URI, reminders);

                callbackContext.success();
                return true;
            }

            if(ADD_EVENT_INTERACTIVELY.equals(action)) {
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
