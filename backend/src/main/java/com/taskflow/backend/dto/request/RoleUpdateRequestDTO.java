package com.taskflow.backend.dto.request;

import com.taskflow.backend.enums.Role;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoleUpdateRequestDTO {

    @NotNull(message = "Role is required")
    private Role role;

}