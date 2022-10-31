package com.ssafy.dto.gitlab;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Branch {
    private String name;

    private String web_url;
}
