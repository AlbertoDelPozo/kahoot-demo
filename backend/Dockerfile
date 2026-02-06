# 1. Usamos una imagen base con Java 17 y Maven para construir
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
# Compilamos el proyecto y saltamos los tests para ir más rápido
RUN mvn clean package -DskipTests

# 2. Usamos una imagen ligera solo con Java para ejecutar
FROM openjdk:17-jdk-slim
WORKDIR /app
# Copiamos el archivo .jar generado en el paso anterior
COPY --from=build /app/target/*.jar app.jar

# Exponemos el puerto 8080
EXPOSE 8080

# Comando para arrancar
ENTRYPOINT ["java", "-jar", "app.jar"]