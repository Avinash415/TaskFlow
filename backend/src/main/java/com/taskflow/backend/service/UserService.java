package com.taskflow.backend.service;

import com.taskflow.backend.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User save(User user);

    List<User> getAllUsers();

    Optional<User> getUserById(Long id);

    Optional<User> getUserByEmail(String email);

    boolean existsByEmail(String email);

    void deleteUser(Long id);

}