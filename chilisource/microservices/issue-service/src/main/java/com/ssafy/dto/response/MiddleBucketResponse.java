package com.ssafy.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MiddleBucketResponse {
    private Long middleBucketId;

    private String name;

    @Builder
    public MiddleBucketResponse(Long middleBucketId, String name) {
        this.middleBucketId = middleBucketId;
        this.name = name;
    }
}
