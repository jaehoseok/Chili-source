package com.ssafy.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "issue_type_id")
    private IssueType issueType;

    private Long userId;

    private Long projectId;

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
}
