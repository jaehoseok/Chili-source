package com.ssafy.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserProjectCreateRequest {
    private String userColor = "FFFFFF";

    private Long userId;

    private Long projectId;


    @Builder
    public UserProjectCreateRequest(String userColor, Long userId, Long projectId) {
        if (userColor != null) this.userColor = userColor;
        this.userId = userId;
        this.projectId = projectId;
    }
}
