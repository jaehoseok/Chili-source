package com.ssafy.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
public class Token extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "token_id")
    private Long id;

    private String value;

    private String email;

    private String jiraAccountId;

    private Long userId;

    @ManyToOne
    @JoinColumn(name = "token_code_id")
    private TokenCode tokenCode;

    @Builder
    public Token(String value, TokenCode tokenCode, String email, String jiraAccountId, Long userId) {
        this.value = value;
        this.tokenCode = tokenCode;
        this.email = email;
        this.jiraAccountId = jiraAccountId;
        this.userId = userId;
    }

    public void update(String value, String email) {
        this.value = value;
        this.email = email;
    }
    public void updateJira(String jiraAccountId){
        this.jiraAccountId = jiraAccountId;
    }
}
