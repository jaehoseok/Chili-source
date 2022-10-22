package com.ssafy.entity;

import lombok.Getter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
public class Role extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Long id;

    private Boolean modify;

    private Boolean invite;

    private Boolean fire;

    private Boolean delete;

    private String name;

    @OneToMany(mappedBy = "role")
    private Set<UserProject> userProjects;
}
