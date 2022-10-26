package com.ssafy.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TokenCodeResponse {
    private Long id;
    private String name;

    @Builder
    public TokenCodeResponse(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
