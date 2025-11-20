package com.dumbcatanv2.dumb_catan_v2_server.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/* DTO for create game requests */
@Data
@NoArgsConstructor
public class CreateGameRequest {
    @NotEmpty
    private List<@NotEmpty List<@NotBlank String>> tileOrder;

    @NotEmpty
    private List<@NotEmpty List<@NotBlank String>> diceIdOrder;

    @NotEmpty
    private List<String> devCards;

    @NotBlank
    @Size(max=6)
    private String color;
}
