package com.ssafy.dto.gitlab;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GitlabUser {
    private Long id;

    private String name;

    private String username;

    private String state;

    private String avatar_url;

    private String web_url;
}
