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

    private String description;

    private String image;

    private Long latestGanttVersion = 1L;

    private String jiraToken;

    private String jiraEmail;

    private String jiraProject;

    private String gitToken;

    private String gitRepo;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GanttChart> ganttCharts = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserProject> userProjects = new ArrayList<>();

    @Builder
    public Project(Long id, String name, String description, String image, String jiraToken, String jiraEmail, String jiraProject, String gitToken, String gitRepo, List<GanttChart> ganttCharts, List<UserProject> userProjects) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.jiraToken = jiraToken;
        this.jiraProject = jiraProject;
        this.jiraEmail = jiraEmail;
        this.gitToken = gitToken;
        this.gitRepo = gitRepo;
        this.ganttCharts = ganttCharts;
        this.userProjects = userProjects;
    }

    public void update(String name, String description) {
        if (name != null) this.name = name;
        if (description != null) this.description = description;
    }

    public void updateLatestGanttVersion(Long latestGanttVersion) {
        this.latestGanttVersion = latestGanttVersion;
    }

    public void updateImage(String image) {
        this.image = image;
    }

    public void updateJira(String jiraToken, String jiraProject, String jiraEmail) {
        this.jiraToken = jiraToken;
        this.jiraProject = jiraProject;
        this.jiraEmail = jiraEmail;
    }

    public void updateGit(String gitToken, String gitRepo) {
        this.gitToken = gitToken;
        this.gitRepo = gitRepo;
    }

    public void deleteJira() {
        this.jiraToken = null;
        this.jiraProject = null;
        this.jiraEmail = null;
    }

    public void deleteGit() {
        this.gitToken = null;
        this.gitRepo = null;
    }
}
