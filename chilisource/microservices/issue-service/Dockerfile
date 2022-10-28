FROM openjdk:8 AS builder
VOLUME /tmp

FROM openjdk:8
COPY build/libs/issue-service-0.0.1-SNAPSHOT.jar IssueServer.jar
ENTRYPOINT ["java","-jar","IssueServer.jar"]
