package com.ssafy.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Project extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Long id;

    private String name;

    private String teamName;

    private String image;

    private String jiraProject;

    private String jiraToken;

    private String gitToken;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GanttChart> ganttCharts = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProjectGit> projectGits = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserProject> userProjects = new ArrayList<>();

    @Builder
    public Project(Long id, String name, String teamName, String image, String jiraProject, String jiraToken, String gitToken, List<GanttChart> ganttCharts, List<ProjectGit> projectGits, List<UserProject> userProjects) {
        this.id = id;
        this.name = name;
        this.teamName = teamName;
        this.image = image;
        this.jiraProject = jiraProject;
        this.jiraToken = jiraToken;
        this.gitToken = gitToken;
        this.ganttCharts = ganttCharts;
        this.projectGits = projectGits;
        this.userProjects = userProjects;
    }

    public void update(String name, String teamName, String image, String jiraProject, String jiraToken, String gitToken) {
        if (!name.equals(null)) this.name = name;
        if (!teamName.equals(null)) this.teamName = teamName;
        if (!image.equals(null)) this.image = image;
        if (!jiraProject.equals(null)) this.jiraProject = jiraProject;
        if (!jiraToken.equals(null)) this.jiraToken = jiraToken;
        if (!gitToken.equals(null)) this.gitToken = gitToken;
    }
}
