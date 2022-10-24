package com.ssafy.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
public class TokenCode extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "token_code_id")
    private Long id;

    private String name;

    @OneToMany(mappedBy = "tokenCode", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Token> tokens;

    @Builder
    public TokenCode(String name){
        this.name = name;
    }

    public void update(String name){
        this.name = name;
    }
}
