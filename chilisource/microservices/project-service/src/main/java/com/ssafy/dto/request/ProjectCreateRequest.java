package com.ssafy.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProjectCreateRequest {
    private String name;
    private String teamName;
    private String image;
    private String jiraProject;

    @Builder
    public ProjectCreateRequest(String name, String teamName, String image, String jiraProject) {
        this.name = name;
        this.teamName = teamName;
        this.image = image;
        this.jiraProject = jiraProject;
    }
}
