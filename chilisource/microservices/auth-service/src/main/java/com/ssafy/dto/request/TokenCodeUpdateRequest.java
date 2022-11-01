package com.ssafy.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TokenCodeUpdateRequest {
    private String id;

    @Builder
    public TokenCodeUpdateRequest(String id) {
        this.id = id;
    }
}
