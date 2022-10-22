package com.ssafy.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class ProjectToken extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_token_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    private Long tokenId;
}
