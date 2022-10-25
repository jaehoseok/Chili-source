package com.ssafy.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class IssueType extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "issue_type_id")
    private Long id;

    @NotNull
    private String code;

    @NotNull
    private String name;

    @Builder
    public IssueType(Long id, String code, String name) {
        this.id = id;
        this.code = code;
        this.name = name;
    }
}
