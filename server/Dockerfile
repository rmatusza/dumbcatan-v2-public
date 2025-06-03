FROM amazoncorretto:17-alpine
WORKDIR /app
COPY ./target/dumbcatan-v2-server.jar /
EXPOSE 8080
#ENTRYPOINT java -DDATASOURCE_URL=${DATASOURCE_URL} -DDB_USERNAME=${DB_USERNAME} -DDB_PASSWORD=${DB_PASSWORD} -jar /Catan-Server.jar
ENTRYPOINT ["java", "-jar", "/dumbcatan-v2-server.jar"]