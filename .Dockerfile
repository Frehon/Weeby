FROM openjdk:8u111-jdk-alpine
RUN cd weeby-server
ADD \target\weeby-server-0.0.1-SNAPSHOT.war weeby-server.war
ENTRYPOINT ["java", "-jar","weeby-server.war"]