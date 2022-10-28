package com.ssafy.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

@Repository
public class UserProjectCustomRepoImpl implements UserProjectCustomRepo {
    private final JPAQueryFactory jpaQueryFactory;

    public UserProjectCustomRepoImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }
}
