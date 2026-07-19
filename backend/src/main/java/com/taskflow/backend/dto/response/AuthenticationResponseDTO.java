package com.taskflow.backend.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthenticationResponseDTO {

    private String token;

    private UserResponseDTO user;

}