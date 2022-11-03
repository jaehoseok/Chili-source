package com.ssafy.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FieldResponse {
    private String summary;

    @Builder
    public FieldResponse(String summary) {
        this.summary = summary;
    }
}
