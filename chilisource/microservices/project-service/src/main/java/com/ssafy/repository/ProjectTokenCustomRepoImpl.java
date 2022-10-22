package com.ssafy.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

@Repository
public class ProjectTokenCustomRepoImpl implements ProjectTokenCustomRepo {
    private final JPAQueryFactory jpaQueryFactory;

    public ProjectTokenCustomRepoImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }
}
