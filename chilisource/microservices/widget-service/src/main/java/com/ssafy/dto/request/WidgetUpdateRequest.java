package com.ssafy.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WidgetUpdateRequest {
    private String name;

    @Builder
    public WidgetUpdateRequest(String name){
        this.name = name;
    }
}
