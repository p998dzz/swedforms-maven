package lt.swedforms.Entities;

import org.springframework.data.annotation.Id;

/**
 * Created by Super on 2/19/2016.
 */
public class Registration {
    @Id
    private String id;

    private User user;
    private String date;
    private String banksection;
    private String topic;
    private String phoneNumber;
    private String comments;
    private String name;
    private String surname;
    private String email;

    public Registration() {}

    public Registration(User user, String date, String banksection, String topic, String phoneNumber, String comments, String name, String surname, String email) {
        this.user = user;
        this.date = date;
        this.banksection = banksection;
        this.topic = topic;
        this.phoneNumber = phoneNumber;
        this.comments = comments;
        this.name = name;
        this.surname = surname;
        this.email = email;
    }

    public String getDate() {
        return date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getBanksection() {
        return banksection;
    }

    public void setBanksection(String banksection) {
        this.banksection = banksection;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getId() {
        return id;
    }


    @Override
    public boolean equals(Object obj) {
        Registration reg = (Registration)obj;
        if(reg != null && reg.getUser().getEmail().equals(this.getUser().getEmail()))
            return true;
        return false;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
