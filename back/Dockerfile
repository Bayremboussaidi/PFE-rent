# ---------- Stage 1: Build ----------
    FROM maven:3.9.6-eclipse-temurin-21 AS build
    WORKDIR /app
    
    # Copy Maven build files first to leverage Docker cache
    COPY pom.xml .
    RUN mvn dependency:go-offline -B
    
    # Now copy the rest of the source code
    COPY src ./src
    
    # Build the application
    RUN mvn clean package -DskipTests
    
    # ---------- Stage 2: Run ----------
    FROM eclipse-temurin:21-jdk
    WORKDIR /app
    
    # Copy the built JAR from the build stage
    COPY --from=build /app/target/*.jar app.jar
    
    # Expose backend port
    EXPOSE 8084
    
    # Start the Spring Boot application
    ENTRYPOINT ["java", "-jar", "app.jar"]
    