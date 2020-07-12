# Doodle coding challenge

## Prerequisites
- docker + docker-compose

## To run application
- run `docker-compose up -d` in root folder
- access frontend via url: http://localhost:9090/
- access backend via url: http://localhost:8080/messages/ (for example)
- access mysql DB via localhost, port is exposed to host machine

## Structure
- `docker-compose.yml` contains all dependencies and uses docker files from subfolders.
- `src/chatApi` - contains Spring Boot RestAPI + WebSockets server.
- `src/chatui` - contains ReactJS application.

## Local development
- Maven is used as build system. All dependencies could be found in `src/chatApi/pom.xml`. `src/chatApi/Dockerfile` contains build steps, so local installation of Java dependencies could be omitted if you just want to run application. Otherwise, for local development, you need to install JDK and run maven build.
- `Node.js` + `NPM` is required to run local ReactJS development environment. Details could be found in `src/chatui/package.json`. `Dockerfile` contains build steps, so local installation of Node.js + NPM is not required to run application. Otherwise, for local development, you need to install Node.JS + NPM and run `npm start`.


## TODO
- Unit and integration tests for API
- Unit, integration and UI tests for frontend
- Authentication/authorization for the system
- Better error handling on backend and frontent
- State management on frontend (e.g. redux, mobx)
- ...
