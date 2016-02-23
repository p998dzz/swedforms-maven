package lt.swedforms.transferObjects;

import java.io.Serializable;

/**
 * Created by Super on 2/17/2016.
 */
public class UserData implements Serializable{
    private String user;

    public String getUser() {
        return user;
    }

    public void setUser(String value) {
        this.user = value;
    }
}
