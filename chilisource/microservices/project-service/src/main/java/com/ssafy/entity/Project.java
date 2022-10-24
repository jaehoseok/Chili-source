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

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GanttChart> ganttCharts = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProjectToken> projectTokens = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserProject> userProjects = new ArrayList<>();

    @Builder
    public Project(Long id, String name, String teamName, String image, String jiraProject, List<GanttChart> ganttCharts, List<ProjectToken> projectTokens, List<UserProject> userProjects) {
        this.id = id;
        this.name = name;
        this.teamName = teamName;
        this.image = image;
        this.jiraProject = jiraProject;
        this.ganttCharts = ganttCharts;
        this.projectTokens = projectTokens;
        this.userProjects = userProjects;
    }
}
