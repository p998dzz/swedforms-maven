package lt.swedforms.transferObjects;

import java.io.Serializable;

/**
 * Created by Super on 2/22/2016.
 */
public class RegistrationToDelete implements Serializable{
    private String user;
    private String date;

    public String getUser() {
        return user;
    }

    public void setUser(String value) {
        this.user = value;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
