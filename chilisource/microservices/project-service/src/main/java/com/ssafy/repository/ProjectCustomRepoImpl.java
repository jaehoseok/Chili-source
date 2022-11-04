package com.ssafy.repository;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.entity.Project;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.entity.QProject.project;
import static com.ssafy.entity.QUserProject.userProject;

@Repository
public class ProjectCustomRepoImpl implements ProjectCustomRepo {
    private final JPAQueryFactory jpaQueryFactory;

    public ProjectCustomRepoImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public List<Project> findProjectByUserId(Long userId) {
        return jpaQueryFactory
                .selectFrom(project)
                .where(project.id.in(
                                JPAExpressions
                                        .select(userProject.project.id)
                                        .from(userProject)
                                        .where(userProject.userId.eq(userId))
                        )
                )
                .fetch();
    }
}
