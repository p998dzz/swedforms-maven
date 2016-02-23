package lt.swedforms.transferObjects;

import java.io.Serializable;

/**
 * Created by p998ugh on 2016.02.19.
 */
public class User  implements Serializable {
    private String email;
    private String pass;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String password) {
        this.pass = password;
    }
}
