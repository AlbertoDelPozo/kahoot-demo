# 1. Fase de Construcción
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copiamos todo lo que nos mande Railway
COPY . .

# --- LA MAGIA ESTÁ AQUÍ ---
# Este comando comprueba si estamos en la raíz o si el código está en una subcarpeta 'backend'.
# Ejecuta Maven en el sitio correcto y mueve el .jar final siempre a /app/app.jar
RUN if [ -f "backend/pom.xml" ]; then \
        cd backend && mvn clean package -DskipTests && mv target/*.jar /app/app.jar; \
    elif [ -f "pom.xml" ]; then \
        mvn clean package -DskipTests && mv target/*.jar /app/app.jar; \
    else \
        echo "ERROR: No encuentro el pom.xml en ninguna parte" && exit 1; \
    fi

# 2. Fase de Ejecución
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Ahora sabemos SEGURO que el archivo está en /app/app.jar en la fase anterior
COPY --from=build /app/app.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]