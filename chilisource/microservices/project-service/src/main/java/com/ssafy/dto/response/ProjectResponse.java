package com.ssafy.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ProjectResponse {
    private Long id;

    private String name;

    private String description;

    private String image;

    private String jiraProject;

    private String gitRepo;

    private List<String> TokenList;

    @Builder
    public ProjectResponse(Long id, String name, String description, String image, String jiraProject, String gitRepo, List<String> tokenList) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.jiraProject = jiraProject;
        this.gitRepo = gitRepo;
        this.TokenList = tokenList;
    }
}
