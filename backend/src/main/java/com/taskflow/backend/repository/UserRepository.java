package com.taskflow.backend.repository;

import com.taskflow.backend.entity.User;
import com.taskflow.backend.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // Authentication
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    // =========================
    // Admin Dashboard
    // =========================

    long countByEnabledTrue();

    long countByEnabledFalse();

    long countByRole(Role role);
    long countByRoleAndEnabledTrue(Role role);

    // Recent Users
    List<User> findTop5ByOrderByCreatedAtDesc();
}