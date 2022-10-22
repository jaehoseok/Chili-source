package com.ssafy.entity;

import lombok.Getter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
public class Project extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Long id;

    private String name;

    private String teamName;

    private String image;

    private String jiraProject;

    @OneToMany(mappedBy = "project")
    private Set<GanttChart> ganttCharts;

    @OneToMany(mappedBy = "project")
    private Set<ProjectToken> projectTokens;

    @OneToMany(mappedBy = "project")
    private Set<UserProject> userProjects;
}
