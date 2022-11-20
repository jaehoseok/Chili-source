package com.ssafy.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@ApiModel(value = "프로젝트 응답 정보", description = "설명")
public class ProjectResponse {
    @ApiModelProperty(value = "프로젝트 pk")
    private Long id;

    @ApiModelProperty(value = "프로젝트 이름")
    private String name;

    @ApiModelProperty(value = "프로젝트 설명")
    private String description;

    @ApiModelProperty(value = "프로젝트 이미지 경로")
    private String image;

    @ApiModelProperty(value = "프로젝트 간트차트 최신 버전")
    private Long latestGanttVersion;

    @ApiModelProperty(value = "프로젝트 연결된 Jira 프로젝트 코드")
    private String jiraProject;

    @ApiModelProperty(value = "프로젝트 연결된 Git 레포지토리")
    private String gitRepo;

    @ApiModelProperty(value = "프로젝트 연결된 토큰 종류")
    private List<String> TokenList;

    @Builder
    public ProjectResponse(Long id, String name, String description, String image, Long latestGanttVersion, String jiraProject, String gitRepo, List<String> tokenList) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.latestGanttVersion = latestGanttVersion;
        this.jiraProject = jiraProject;
        this.gitRepo = gitRepo;
        TokenList = tokenList;
    }
}
