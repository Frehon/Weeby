FROM openjdk:8u111-jdk-alpine
ADD target/weeby.war weeby.war
EXPOSE 8080
ENTRYPOINT ["java", "-jar","weeby.war"]
