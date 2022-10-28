FROM openjdk:8 AS builder
VOLUME /tmp

FROM openjdk:8
COPY build/libs/config-service-0.0.1-SNAPSHOT.jar ConfigServer.jar
EXPOSE 8888
ENTRYPOINT ["java","-jar","ConfigServer.jar"]