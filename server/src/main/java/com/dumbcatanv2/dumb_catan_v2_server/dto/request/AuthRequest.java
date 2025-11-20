package com.dumbcatanv2.dumb_catan_v2_server.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

/* DTO for logging in and signing up */
@Data
@NoArgsConstructor
public class AuthRequest {
    @NotBlank
    @Size(max=15)
    private String username;

    @NotBlank
    private String password;
}
