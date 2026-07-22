package com.taskflow.backend.service.helper;

import com.taskflow.backend.entity.User;

public interface UserHelperService {

    User findUserById(Long id);

}