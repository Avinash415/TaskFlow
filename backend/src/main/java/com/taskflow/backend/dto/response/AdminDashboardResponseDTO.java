package com.taskflow.backend.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminDashboardResponseDTO {

    // User Statistics
    private Long totalUsers;

    private Long activeUsers;

    private Long disabledUsers;

    private Long adminUsers;

    private Long normalUsers;

    // Project Statistics
    private Long totalProjects;

    // Task Statistics
    private Long totalTasks;

    private Long completedTasks;

    private Long pendingTasks;

    private Long inProgressTasks;

    // Category Statistics
    private Long totalCategories;

}