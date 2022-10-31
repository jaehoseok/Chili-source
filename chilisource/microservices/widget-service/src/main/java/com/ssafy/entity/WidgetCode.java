package com.ssafy.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
public class WidgetCode extends BaseEntity{
    @Id
    @Column(name = "widget_code_id")
    private String id;

    private String requestUrl;

    private String detailRequestUrl;

    @OneToMany(mappedBy = "widgetCode", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Widget> widgets;

    @Builder
    public WidgetCode(String id, String requestUrl, String detailRequestUrl){
        this.id = id;
        this.requestUrl = requestUrl;
        this.detailRequestUrl = detailRequestUrl;
    }

    public void update(String id, String requestUrl, String detailRequestUrl){
        this.id = id;
        this.requestUrl = requestUrl;
        this.detailRequestUrl = detailRequestUrl;
    }
}
