package eirkdbd.controller;

import eirkdbd.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import eirkdbd.response.UserResponse;
import eirkdbd.service.UserService;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@RestController
@RequestMapping("/get/user/")
public class UserController {

    @Autowired
    private UserService service;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public @ResponseBody
    UserResponse getUser(@PathVariable("id") Integer id) {
        User user = service.get(id);
        return new UserResponse(user);
    }

    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody
    UserResponse getUsers() {
        Iterable<User> all = service.getAll();
        return new UserResponse(all);
    }

    @RequestMapping(value = "/{user}", method = RequestMethod.POST)
    public @ResponseBody
    UserResponse putUser(@PathVariable("user") User user) {
        service.set(user);
        User get = service.get(user.getId());
        return new UserResponse(get);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public @ResponseBody
    UserResponse removeUser(@PathVariable("id") Integer id) {
        User get = service.get(id);
        service.remove(id);
        return new UserResponse(get);
    }
}
