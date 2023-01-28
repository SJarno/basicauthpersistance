# Basic Auth with Spring Boot and Angular
[![Build and Test Spring Boot Project](https://github.com/SJarno/basicauthinmem/actions/workflows/gradle.yml/badge.svg)](https://github.com/SJarno/basicauthinmem/actions/workflows/gradle.yml)
[![codecov](https://codecov.io/gh/SJarno/basicauthinmem/branch/main/graph/badge.svg?token=H5E3IEGQBQ)](https://codecov.io/gh/SJarno/basicauthinmem)

Basic auth with Spring Boot, Spring Security 6 and in-mem users

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
In memory users put to place, and working. Just added an extra bean for userdetails with defaultPasswordEncoder.
Did note that the very first time after initial building the browser authentication popped up. But did started to work after this. Wondering if this would be an issue in production.

The application itself is very simple, with some added complexity with different role types.

## Authentication
Basic auth - username and password.

## Next steps
Persisting user info in h2-database, custom userdetails.
