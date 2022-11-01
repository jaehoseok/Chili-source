package com.ssafy.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FieldResponse {
    private String summary;

    @Builder
    public FieldResponse(String summary) {
        this.summary = summary;
    }
}
