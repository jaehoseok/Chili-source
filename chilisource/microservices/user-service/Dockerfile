FROM openjdk:8 AS builder
VOLUME /tmp

FROM openjdk:8
COPY build/libs/user-service-0.0.1-SNAPSHOT.jar UserServer.jar
ENTRYPOINT ["java","-jar","UserServer.jar"]