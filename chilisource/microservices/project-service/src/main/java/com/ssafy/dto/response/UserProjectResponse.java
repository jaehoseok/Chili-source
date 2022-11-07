package com.ssafy.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "팀원 정보")
public class UserProjectResponse {
    @ApiModelProperty(value = "팀원 색깔")
    private String userColor;

    @ApiModelProperty(value = "팀원 유저 pk")
    private Long userId;

    @ApiModelProperty(value = "프로젝트 pk")
    private Long projectId;

    @ApiModelProperty(value = "권한 pk")
    private String roleId;

    @Builder
    public UserProjectResponse(String userColor, Long userId, Long projectId, String roleId) {
        this.userColor = userColor;
        this.userId = userId;
        this.projectId = projectId;
        this.roleId = roleId;
    }
}
