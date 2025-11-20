package com.dumbcatanv2.dumb_catan_v2_server.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

/* DTO for updating user data */
// userId provided through path variable
@Data
@NoArgsConstructor
public class UserDataRequest {
    @NotBlank
    @Size(max=15)
    private String username = "NONE";

    @NotBlank
    private String password = "NONE";

    @NotBlank
    @Size(max=5)
    private String avatarURL = "NONE";
}
