package lt.swedforms.transferObjects;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Super on 2/19/2016.
 */
public class DateObject implements Serializable {
    String date;
    List<String> times;

    public DateObject(String date)
    {
        this.date = date;
        times = new ArrayList<String>();
        for(int i = 8; i < 17; i++)
            times.add(i+":00");
    }

    public void removeTime(String time){
        int indexToDelete = -1;
        for(String existingTime : times)
        {
            if(existingTime.equals(time)) {
                indexToDelete = times.indexOf(existingTime);
                break;
            }
        }
        if(indexToDelete != -1)
            times.remove(indexToDelete);
    }

    public String getDate() {
        return date;
    }

    public List<String> getTimes() {
        return times;
    }
}
