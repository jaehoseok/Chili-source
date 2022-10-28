package com.ssafy.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TokenCodeUpdateRequest {
    private String name;

    @Builder
    public TokenCodeUpdateRequest(String name) {
        this.name = name;
    }
}
