package com.ssafy.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
public class GanttChartCustomRepoImpl implements GanttChartCustomRepo{

    private final JPAQueryFactory jpaQueryFactory;

    public GanttChartCustomRepoImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }
}
