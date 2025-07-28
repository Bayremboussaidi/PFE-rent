@echo off
REM Set JDK 17 as JAVA_HOME
set "JAVA_HOME=C:\Program Files\Java\jdk-17"
set "PATH=%JAVA_HOME%\bin;%PATH%"

REM Run Maven with all passed arguments
mvn %*
