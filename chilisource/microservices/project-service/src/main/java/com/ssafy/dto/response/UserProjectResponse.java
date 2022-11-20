package com.ssafy.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "팀원 응답 정보")
public class UserProjectResponse {
    @ApiModelProperty(value = "팀원 색깔")
    private String userColor;

    @ApiModelProperty(value = "팀원 유저 pk")
    private Long userId;

    @ApiModelProperty(value = "팀원 유저 이름")
    private String userName;

    @ApiModelProperty(value = "팀원 유저 이미지 주소")
    private String userImage;

    @ApiModelProperty(value = "프로젝트 pk")
    private Long projectId;

    @ApiModelProperty(value = "권한 정보")
    private RoleResponse role;

    @Builder
    public UserProjectResponse(String userColor, Long userId, String userName, String userImage, Long projectId, RoleResponse role) {
        this.userColor = userColor;
        this.userId = userId;
        this.userName = userName;
        this.userImage = userImage;
        this.projectId = projectId;
        this.role = role;
    }
}
