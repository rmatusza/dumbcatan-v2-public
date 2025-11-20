package com.dumbcatanv2.dumb_catan_v2_server.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

/* DTO for adding a road */
// gameId provided as a path variable
// roadId is auto generated
@Data
@NoArgsConstructor
public class CreateRoadRequest {
    @NotNull
    private Integer roadNumber;

    @NotBlank
    @Size(max=6)
    private String color;
}
