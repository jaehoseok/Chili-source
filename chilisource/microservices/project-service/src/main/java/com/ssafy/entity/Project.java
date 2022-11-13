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

    private String jiraAccountId;

    private String jiraEmail;

    private String jiraProject;

    private String jiraType;

    private String gitToken;

    private String gitRepo;

    private String gitType;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GanttChart> ganttCharts = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserProject> userProjects = new ArrayList<>();

    @Builder
    public Project(Long id, String name, String description, String image, String jiraToken, String jiraAccountId, String jiraEmail, String jiraProject, String jiraType, String gitToken, String gitRepo, String gitType, List<GanttChart> ganttCharts, List<UserProject> userProjects) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.jiraToken = jiraToken;
        this.jiraAccountId = jiraAccountId;
        this.jiraEmail = jiraEmail;
        this.jiraProject = jiraProject;
        this.jiraType = jiraType;
        this.gitToken = gitToken;
        this.gitRepo = gitRepo;
        this.gitType = gitType;
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

    public void updateJira(String jiraToken, String jiraProject, String jiraAccountId, String jiraEmail, String jiraType) {
        this.jiraToken = jiraToken;
        this.jiraProject = jiraProject;
        this.jiraAccountId = jiraAccountId;
        this.jiraEmail = jiraEmail;
        this.jiraType = jiraType;
    }

    public void updateGit(String gitToken, String gitRepo, String gitType) {
        this.gitToken = gitToken;
        this.gitRepo = gitRepo;
        this.gitType = gitType;
    }

    public void deleteJira() {
        this.jiraToken = null;
        this.jiraProject = null;
        this.jiraAccountId = null;
        this.jiraEmail = null;
        this.jiraType = null;
    }

    public void deleteGit() {
        this.gitToken = null;
        this.gitRepo = null;
        this.gitType = null;
    }
}
