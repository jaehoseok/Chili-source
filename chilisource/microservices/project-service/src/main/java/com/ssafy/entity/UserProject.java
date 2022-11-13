package com.ssafy.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class UserProject extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_project_id")
    private Long id;

    private String userColor;

    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id")
    private Role role;

    @Builder
    public UserProject(Long id, String userColor, Long userId, Project project, Role role) {
        this.id = id;
        this.userColor = userColor;
        this.userId = userId;
        this.project = project;
        this.role = role;
    }

    public void update(String userColor) {
        if (userColor != null) this.userColor = userColor;
    }

    public void updateRole(Role role) {
        if (role != null) this.role = role;
    }
}
