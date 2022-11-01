FROM openjdk:8 AS builder
VOLUME /tmp

FROM openjdk:8
COPY build/libs/widget-service-0.0.1-SNAPSHOT.jar WidgetService.jar
ENTRYPOINT ["java","-jar","WidgetService.jar"]
