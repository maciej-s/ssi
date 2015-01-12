package eirkdbd.response;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import eirkdbd.model.User;
import java.util.ArrayList;

@JsonSerialize
public class UserResponse {

    private Iterable<User> users;

    public UserResponse(User user) {
        ArrayList arrayList = new ArrayList();
        arrayList.add(user);
        this.users = arrayList;
        
    }

    public UserResponse(Iterable<User> all) {
        users = all;
    }

    public Iterable<User> getUsers() {
        return users;
    }

    public void setUsers(Iterable<User> users) {
        this.users = users;
    }
}
