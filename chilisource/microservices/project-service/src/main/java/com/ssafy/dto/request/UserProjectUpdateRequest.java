package com.ssafy.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserProjectUpdateRequest {
    private String userColor;

    private Long userId;

    private Long projectId;

    private Long roleId;


    @Builder
    public UserProjectUpdateRequest(String userColor, Long userId, Long projectId, Long roleId) {
        this.userColor = userColor;
        this.userId = userId;
        this.projectId = projectId;
        this.roleId = roleId;
    }
}
