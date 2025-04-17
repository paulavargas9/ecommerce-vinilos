#!/bin/bash

# Buscar si hay algún proceso usando el puerto 8082
PID=$(lsof -ti :8082)

# Si existe, lo mata
if [ ! -z "$PID" ]; then
  echo " Matando proceso que usaba el puerto 8082 (PID $PID)..."
  kill -9 $PID
else
  echo " El puerto 8082 está libre."
fi

# Arranca el proyecto Spring Boot
echo "🚀 Iniciando proyecto Spring Boot..."
./mvnw spring-boot:run
