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

    private String url;

    private Long widgetRow;

    private Long widgetCol;

    private Long projectId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "widget_code_id")
    private WidgetCode widgetCode;

    @Builder
    public Widget(String name, String url, Long widgetRow, Long widgetCol, Long projectId, WidgetCode widgetCode) {
        this.name = name;
        this.url = url;
        this.widgetRow = widgetRow;
        this.widgetCol = widgetCol;
        this.projectId = projectId;
        this.widgetCode = widgetCode;
    }

    public void update(String name, String url) {
        this.name = name;
        this.url = url;
    }

    public void locUpdate(Long widgetRow, Long widgetCol) {
        this.widgetRow = widgetRow;
        this.widgetCol = widgetCol;
    }
}
