FROM openjdk:8 AS builder
VOLUME /tmp

FROM openjdk:8
COPY build/libs/auth-service-0.0.1-SNAPSHOT.jar AuthServer.jar
ENTRYPOINT ["java","-jar","AuthServer.jar"]