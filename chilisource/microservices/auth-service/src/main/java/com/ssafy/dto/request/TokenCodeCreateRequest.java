package com.ssafy.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TokenCodeCreateRequest {
    private String name;

    @Builder
    public TokenCodeCreateRequest(String name) {
        this.name = name;
    }
}
