package com.ssafy.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
public class Widget extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "widget_id")
    private Long id;

    private String name;

    private Long projectId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "widget_code_id")
    private WidgetCode widgetCode;

    @Builder
    public Widget(String name, Long projectId, WidgetCode widgetCode) {
        this.name = name;
        this.projectId = projectId;
        this.widgetCode = widgetCode;
    }

    public void update(String name) {
        this.name = name;
    }
}
