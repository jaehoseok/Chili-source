package com.ssafy.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class JiraMySelfResponse {
    private String accountId;

    @Builder
    public JiraMySelfResponse(String accountId){
        this.accountId = accountId;
    }
}
