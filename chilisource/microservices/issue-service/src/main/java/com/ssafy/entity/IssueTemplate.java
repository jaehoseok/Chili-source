package com.ssafy.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class IssueTemplate extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "issue_template_id")
    private Long id;

    @NotNull
    @Length(max = 2000)
    private String summary;

    private String description;

    private String assignee;

    private String priority;

    private String epicLink;

    private Long sprint;

    private Double storyPoints;

    private Long userId;

    private Long projectId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "issue_type_id")
    private IssueType issueType;

    @Builder
    public IssueTemplate(Long id, String summary, String description, String assignee, String priority, String epicLink,
                         Long sprint, Double storyPoints, IssueType issueType, Long userId, Long projectId) {
        this.id = id;
        this.summary = summary;
        this.description = description;
        this.assignee = assignee;
        this.priority = priority;
        this.epicLink = epicLink;
        this.sprint = sprint;
        this.storyPoints = storyPoints;
        this.issueType = issueType;
        this.userId = userId;
        this.projectId = projectId;
    }

    public void update(String summary, String description, String assignee, String priority, String epicLink,
                       Long sprint, Double storyPoints, IssueType issueType) {
        if (summary != null) this.summary = summary;
        if (description != null) this.description = description;
        if (assignee != null) this.assignee = assignee;
        if (priority != null) this.priority = priority;
        if (epicLink != null) this.epicLink = epicLink;
        if (sprint != null) this.sprint = sprint;
        if (storyPoints != null) this.storyPoints = storyPoints;
        if (issueType != null) this.issueType = issueType;
    }
}
