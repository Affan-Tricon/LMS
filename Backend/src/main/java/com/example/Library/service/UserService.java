package com.example.Library.service;

import com.example.Library.model.User;
import com.example.Library.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists");
        }

        return userRepository.save(user);
    }

    public Long findByEmail(String email) {
        return userRepository.findByEmail(email).get().getId();
    }
}
