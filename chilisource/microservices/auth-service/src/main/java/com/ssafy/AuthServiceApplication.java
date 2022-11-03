package com.ssafy;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableDiscoveryClient
@EnableJpaAuditing
@EnableFeignClients
@Slf4j
public class AuthServiceApplication {
    public static void main(String[] args) throws InterruptedException {
        SpringApplication.run(AuthServiceApplication.class, args);
        while(true){
            Thread.sleep(2000);
            log.info("test");
        }
    }
}