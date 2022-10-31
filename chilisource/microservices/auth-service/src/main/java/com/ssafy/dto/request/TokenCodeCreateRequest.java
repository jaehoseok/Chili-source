package com.ssafy.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TokenCodeCreateRequest {
    private String id;

    @Builder
    public TokenCodeCreateRequest(String id) {
        this.id = id;
    }
}
