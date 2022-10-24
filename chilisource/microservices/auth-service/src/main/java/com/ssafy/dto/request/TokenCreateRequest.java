package com.ssafy.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TokenCreateRequest {
    private String value;
    private Long tokenCodeId;

    @Builder
    public TokenCreateRequest(String value, Long tokenCodeId){
        this.value = value;
        this.tokenCodeId = tokenCodeId;
    }
}
