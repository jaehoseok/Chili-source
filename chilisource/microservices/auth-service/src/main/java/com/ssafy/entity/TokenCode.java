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
public class TokenCode extends BaseEntity {
    @Id
    @Column(name = "token_code_id")
    private String id;

    @OneToMany(mappedBy = "tokenCode", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Token> tokens;

    @Builder
    public TokenCode(String id) {
        this.id = id;
    }

    public void update(String id) {
        this.id = id;
    }
}
