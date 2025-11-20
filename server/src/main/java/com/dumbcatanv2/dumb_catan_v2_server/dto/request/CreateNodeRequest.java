package com.dumbcatanv2.dumb_catan_v2_server.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

/* DTO for adding a node */
// gameId provided as a path variable
// nodeId is auto generated
@Data
@NoArgsConstructor
public class CreateNodeRequest {
    @NotNull
    private Integer nodeNumber;

    @NotBlank
    @Size(max=10)
    private String structure;

    @NotBlank
    @Size(max=6)
    private String color;
}
