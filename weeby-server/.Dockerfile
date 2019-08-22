FROM openjdk:8u111-jdk-alpine
RUN cd weeby-server
ADD \target\weeby.war weeby.war
EXPOSE 8080
ENTRYPOINT ["java", "-jar","wweeby.war"]
