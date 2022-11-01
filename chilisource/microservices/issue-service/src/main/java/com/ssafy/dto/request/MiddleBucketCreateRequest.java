package com.ssafy.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MiddleBucketCreateRequest {
    private String name;

    private Long projectId;
}
