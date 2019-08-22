FROM openjdk:8u111-jdk-alpine
ADD /builds/Frehon/Weeby/weeby-server/target/weeby.war weeby.war
EXPOSE 8080
ENTRYPOINT ["java", "-jar","weeby.war"]
