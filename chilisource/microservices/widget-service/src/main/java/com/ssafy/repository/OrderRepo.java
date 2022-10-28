package com.ssafy.repository;

import com.ssafy.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderRepo extends JpaRepository<Order, Long> {
    Optional<Order> findByProjectId(Long projectId);
    void deleteByProjectId(Long projectId);
}
