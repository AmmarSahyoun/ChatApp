package com.example.demo.controllers;

import com.example.demo.entities.User;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    UserService userService;


    @GetMapping("/rest/users")
    public List<User> getAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/rest/users/{id}")
    public User getOneUser(@PathVariable int id) {
        return userService.findOneUser(id);
    }

    @PostMapping("/auth/register")
    public User createNewUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @GetMapping("/auth/whoami")
    public User whoAmI() {
        return userService.findCurrentUser();
    }
}
