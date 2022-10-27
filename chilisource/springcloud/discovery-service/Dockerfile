FROM openjdk:8 AS builder
VOLUME /tmp

FROM openjdk:8
COPY build/libs/discovery-service-0.0.1-SNAPSHOT.jar DiscoveryServer.jar
EXPOSE 8761
ENTRYPOINT ["java","-jar","DiscoveryServer.jar"]
