# Basic Auth with Spring Boot and Angular
[![Build and Test Spring Boot Project](https://github.com/SJarno/basicauthpersistance/actions/workflows/gradle.yml/badge.svg)](https://github.com/SJarno/basicauthpersistance/actions/workflows/gradle.yml)
[![codecov](https://codecov.io/gh/SJarno/basicauthpersistance/branch/main/graph/badge.svg?token=I86BGDVMV8)](https://codecov.io/gh/SJarno/basicauthpersistance)

Basic auth with Spring Boot, Spring Security 6 and persisting in H2 database

## About
Some testing and practice for future reference. Main goal is to update Spring Security from 5.8 to 6.x.

## Requirements
- Node v.16.14.2
- Angular v.14
- Spring Boot 3.0.2
- Java 17
- Gradle 7.6

## Running
From the front end root, run "ng build --configuration production --aot"
After this, from the root of the project run ".\gradlew bootRun"

## Issues
Currently unable to resolve situation with Cors configuration. But then again one can always use ng build --watch for local development.

## Status
Currently user are persisted in h2 database with user and superuser. 


## Authentication
No-op encoder in use - for testing purposes

## Next steps
Upcoming
