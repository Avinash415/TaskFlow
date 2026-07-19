package com.taskflow.backend.repository;

import com.taskflow.backend.entity.Task;
import com.taskflow.backend.entity.User;
import com.taskflow.backend.enums.TaskPriority;
import com.taskflow.backend.enums.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.time.LocalDate;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    // Existing Methods
    List<Task> findByUserId(Long userId);

    List<Task> findByUserIdAndProjectId(Long userId, Long projectId);

    List<Task> findByUserIdAndStatus(Long userId, TaskStatus status);

    @Query("""
            SELECT t
            FROM Task t
            WHERE t.user.id = :userId
              AND t.dueDate < :today
              AND t.status <> com.taskflow.backend.enums.TaskStatus.COMPLETED
            """)
    List<Task> findOverdueTasks(@Param("userId") Long userId,
                                @Param("today") LocalDate today);

    // Dashboard Methods
    long countByUser(User user);

    long countByUserAndStatus(User user, TaskStatus status);

    long countByUserAndPriority(User user, TaskPriority priority);

    List<Task> findTop5ByUserOrderByCreatedAtDesc(User user);
}