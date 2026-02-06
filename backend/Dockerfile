# 1. Fase de Construcción (Build)
# Usamos una imagen oficial de Maven con Java 17 (Eclipse Temurin es más estable)
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# --- CAMBIO IMPORTANTE ---
# Copiamos TODO el contenido de la carpeta actual (backend) al contenedor.
# Esto es más seguro que copiar carpeta a carpeta y evita errores de "src not found".
COPY . .

# Compilamos el proyecto y generamos el archivo .jar (saltando los tests para ir rápido)
RUN mvn clean package -DskipTests

# 2. Fase de Ejecución (Run)
# Usamos una imagen muy ligera de Java 17 solo para correr la app
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Buscamos el archivo .jar que generó la fase anterior.
# El asterisco (*.jar) hace que no importe cómo se llame tu archivo (kahoot-0.0.1.jar, etc).
COPY --from=build /app/target/*.jar app.jar

# Informamos a Railway de que la app escucha en el puerto 8080
EXPOSE 8080

# Comando para arrancar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]