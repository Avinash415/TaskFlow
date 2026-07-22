
package com.taskflow.backend.service.helper.impl;

import com.taskflow.backend.entity.User;
import com.taskflow.backend.exception.ResourceNotFoundException;
import com.taskflow.backend.repository.UserRepository;
import com.taskflow.backend.service.helper.UserHelperService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserHelperServiceImpl
        implements UserHelperService {

    private final UserRepository userRepository;

    @Override
    public User findUserById(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with id : " + id));

    }

}