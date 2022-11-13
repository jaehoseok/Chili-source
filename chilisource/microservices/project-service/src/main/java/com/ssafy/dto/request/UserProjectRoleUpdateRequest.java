package com.ssafy.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "팀원 권한 수정", description = "설명")
public class UserProjectRoleUpdateRequest {
    @ApiModelProperty(value = "팀원 유저 pk")
    private Long userId;

    @ApiModelProperty(value = "프로젝트 pk")
    private Long projectId;

    @ApiModelProperty(value = "권한 pk MASTER / MAINTAINER / DEVELOPER")
    private String roleId;

    @Builder
    public UserProjectRoleUpdateRequest(Long userId, Long projectId, String roleId) {
        this.userId = userId;
        this.projectId = projectId;
        this.roleId = roleId;
    }
}
