package com.ssafy.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

@Repository
public class ProjectCustomRepoImpl implements ProjectCustomRepo {
    private final JPAQueryFactory jpaQueryFactory;

    public ProjectCustomRepoImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }
}
