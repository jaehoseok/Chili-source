package com.ssafy.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProjectResponse {
    private Long id;
    private String name;
    private String teamName;
    private String image;
    private String jiraProject;

    @Builder
    public ProjectResponse(Long id, String name, String teamName, String image, String jiraProject) {
        this.id = id;
        this.name = name;
        this.teamName = teamName;
        this.image = image;
        this.jiraProject = jiraProject;
    }
}
