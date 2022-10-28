package com.ssafy.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long id;

    private Long projectId;

    private String order;

    @Builder
    public Order(Long projectId, String order){
        this.projectId = projectId;
        this.order = order;
    }

    public void update(String order){
        this.order = order;
    }
}
