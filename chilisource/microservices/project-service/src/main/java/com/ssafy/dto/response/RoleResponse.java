package com.ssafy.dto.response;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "권한 정보")
public class RoleResponse {
    private String id;

    private Boolean modify;

    private Boolean invite;

    private Boolean fire;

    private Boolean remove;

    @Builder
    public RoleResponse(String id, Boolean modify, Boolean invite, Boolean fire, Boolean remove) {
        this.id = id;
        this.modify = modify;
        this.invite = invite;
        this.fire = fire;
        this.remove = remove;
    }
}
