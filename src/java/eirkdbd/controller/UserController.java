package eirkdbd.controller;

import eirkdbd.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import eirkdbd.response.UserResponse;
import eirkdbd.service.UserService;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
@RequestMapping("/get/user/")
public class UserController {

    @Autowired
    private UserService service;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public UserResponse getUser(@PathVariable("id") Integer id) {
        User user = service.get(id);
        // convert user to user response
        return null;
    }

    @RequestMapping(method = RequestMethod.GET)
    public UserResponse getUsers() {
        Iterable<User> all = service.getAll();
        // convert users to users response
        return null;
    }

    @RequestMapping(value = "/{user}", method = RequestMethod.POST)
    public UserResponse putUser(@PathVariable("user") User user) {
        service.set(user);
        // convert user to user response
        return null;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void removeUser(@PathVariable("id") Integer id) {
        service.remove(id);
    }
}
