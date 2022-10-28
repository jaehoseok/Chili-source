FROM openjdk:8 AS builder
VOLUME /tmp

FROM openjdk:8
COPY build/libs/project-service-0.0.1-SNAPSHOT.jar ProjectServer.jar
ENTRYPOINT ["java","-jar","ProjectServer.jar"]
