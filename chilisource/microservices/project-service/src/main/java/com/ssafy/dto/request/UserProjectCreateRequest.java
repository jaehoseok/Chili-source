package com.ssafy.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "팀원 정보", description = "설명")
public class UserProjectCreateRequest {
    @ApiModelProperty(value = "팀원 색깔")
    private String userColor = "#e9e9e9";

    @ApiModelProperty(value = "팀원 유저 pk")
    private Long userId;

    @ApiModelProperty(value = "프로젝트 pk")
    private Long projectId;

    @Builder
    public UserProjectCreateRequest(String userColor, Long userId, Long projectId) {
        if (userColor != null) this.userColor = userColor;
        this.userId = userId;
        this.projectId = projectId;
    }
}
