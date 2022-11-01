package com.ssafy.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WidgetLocUpdateRequest {
    private Long id;

    private Integer row;

    private Integer col;
}
