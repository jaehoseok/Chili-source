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
public class Role extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Long id;

    @Column(nullable = false, columnDefinition = "TINYINT", length=1)
    private Boolean modify;

    @Column(nullable = false, columnDefinition = "TINYINT", length=1)
    private Boolean invite;

    @Column(nullable = false, columnDefinition = "TINYINT", length=1)
    private Boolean fire;

    @Column(nullable = false, columnDefinition = "TINYINT", length=1)
    private Boolean remove;

    private String name;

    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserProject> userProjects = new ArrayList<>();

    @Builder
    public Role(Long id, Boolean modify, Boolean invite, Boolean fire, Boolean remove, String name, List<UserProject> userProjects) {
        this.id = id;
        this.modify = modify;
        this.invite = invite;
        this.fire = fire;
        this.remove = remove;
        this.name = name;
        this.userProjects = userProjects;
    }
}
