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
public class MiddleBucket extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "middle_bucket_id")
    private Long id;

    private String name;

    private Long userId;

    private Long projectId;

    @OneToMany(mappedBy = "middleBucket", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MiddleBucketIssue> middleBucketIssues = new ArrayList<>();

    @Builder
    public MiddleBucket(Long id, String name, Long userId, Long projectId, List<MiddleBucketIssue> middleBucketIssues) {
        this.id = id;
        this.name = name;
        this.userId = userId;
        this.projectId = projectId;
        this.middleBucketIssues = middleBucketIssues;
    }

    @Override
    public boolean equals(Object obj) {
        return obj instanceof MiddleBucket
                && this.id.equals(((MiddleBucket) obj).id);
    }

    public void update(String name) {
        this.name = name;
    }
}
