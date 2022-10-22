package com.ssafy.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class UserProject extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_project_id")
    private Long id;

    private String userColor;

    private Long userId;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;
}
