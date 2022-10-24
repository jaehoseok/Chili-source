package com.ssafy.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
public class Token extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "token_id")
    private Long id;

    private String value;

    @ManyToOne
    @JoinColumn(name = "token_code_id")
    private TokenCode tokenCode;

    private Long userId;

    @Builder
    public Token(String value, TokenCode tokenCode, Long userId){
        this.value = value;
        this.tokenCode = tokenCode;
        this.userId = userId;
    }

    public void update(String value){
        this.value = value;
    }
}
