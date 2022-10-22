package com.ssafy.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

@Repository
public class RoleCustomRepoImpl implements RoleCustomRepo {
    private final JPAQueryFactory jpaQueryFactory;

    public RoleCustomRepoImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }
}
