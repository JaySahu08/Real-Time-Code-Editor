# Real-Time Collaborative Code Editor

A full-stack **real-time collaborative code editor** that allows multiple developers to work together in shared coding rooms, communicate in real time, and eventually collaborate through additional tools such as shared files, presence, and voice communication.

The project is being developed as a **modular monolith** using Spring Boot for the backend and React for the frontend, with WebSocket-based real-time communication.

> **Project Status:** 🚧 Under Active Development

---

## Overview

Working on code together usually means switching between code editors, screen sharing, chat applications, and version control platforms.

This project aims to bring the core collaborative development experience into a single platform.

Users will be able to:

* Create an account and securely authenticate
* Create collaborative coding rooms
* Invite other developers using shareable links
* Edit code together in real time
* Communicate through room-based chat
* Work with multiple files inside a project
* See other users' presence and cursor activity
* Collaborate through additional tools such as a whiteboard and voice communication

The initial focus is building a reliable backend and real-time synchronization system before adding advanced collaboration features.

---

# Architecture

The application follows a **modular monolith architecture**.

Instead of immediately splitting the application into multiple microservices, related functionality is organized into independent modules inside a single Spring Boot application.

```text
                         ┌──────────────────────┐
                         │       React UI       │
                         │                      │
                         │  Monaco Editor       │
                         │  Chat                │
                         │  Rooms               │
                         └──────────┬───────────┘
                                    │
                         REST APIs / WebSocket
                                    │
                                    ▼
                    ┌──────────────────────────────┐
                    │       Spring Boot Backend    │
                    │                              │
                    │ ┌──────────┐ ┌────────────┐ │
                    │ │   Auth   │ │   Users    │ │
                    │ └──────────┘ └────────────┘ │
                    │                              │
                    │ ┌──────────┐ ┌────────────┐ │
                    │ │  Rooms   │ │   Chat     │ │
                    │ └──────────┘ └────────────┘ │
                    │                              │
                    │ ┌──────────────────────────┐ │
                    │ │ Real-Time Collaboration  │ │
                    │ │       WebSocket/STOMP    │ │
                    │ └──────────────────────────┘ │
                    └──────────────┬───────────────┘
                                   │
                                   ▼
                          ┌─────────────────┐
                          │   PostgreSQL    │
                          └─────────────────┘
```

---

# Technology Stack

## Backend

| Technology      | Purpose                        |
| --------------- | ------------------------------ |
| Java 21+        | Backend development            |
| Spring Boot     | Application framework          |
| Spring Security | Authentication & authorization |
| JWT             | Stateless authentication       |
| BCrypt          | Password hashing               |
| Spring Data JPA | Database access                |
| Hibernate       | ORM                            |
| PostgreSQL      | Relational database            |
| WebSocket       | Real-time communication        |
| STOMP           | WebSocket messaging protocol   |
| Maven           | Dependency management          |

## Frontend

| Technology              | Purpose             |
| ----------------------- | ------------------- |
| React                   | Frontend UI         |
| JavaScript / TypeScript | Application logic   |
| Vite                    | Frontend tooling    |
| Axios                   | HTTP communication  |
| React Router            | Client-side routing |
| Monaco Editor           | Code editor         |

## Development & Deployment

* Git
* GitHub
* Docker
* Postman
* Linux
* AWS

---

# Authentication Flow

Authentication is implemented using **JWT-based stateless authentication**.

```text
                User
                 │
                 │ Login
                 ▼
          POST /api/auth/login
                 │
                 ▼
        Verify email/password
                 │
                 ▼
           Generate JWT
                 │
                 ▼
             Client
                 │
                 │ Authorization: Bearer <JWT>
                 ▼
       JwtAuthenticationFilter
                 │
                 ▼
          Validate JWT
                 │
                 ▼
        Extract user identity
                 │
                 ▼
         SecurityContext
                 │
                 ▼
        Protected Controller
```

Passwords are never stored as plain text. They are hashed using BCrypt before being stored in PostgreSQL.

---

# API Endpoints

## Authentication

### Register

```http
POST /api/user/create
```

Example request:

```json
{
  "gmail": "user@example.com",
  "name": "John",
  "password": "password123"
}
```

### Login

```http
POST /api/auth/login
```

Example request:

```json
{
  "gmail": "user@example.com",
  "password": "password123"
}
```

Response:

```text
<JWT_TOKEN>
```

### Current User

```http
GET /api/user/me
```

Requires:

```http
Authorization: Bearer <JWT_TOKEN>
```

Example response:

```json
{
  "gmail": "user@example.com",
  "name": "John"
}
```

---

# Planned Room Architecture

The core collaboration system will be based around rooms.

```text
User
 │
 ├───────────────┐
 │               │
 ▼               ▼
Room          RoomMember
 │               │
 │               └── role
 │                   ├── OWNER
 │                   ├── EDITOR
 │                   └── VIEWER
 │
 └── Project Files
```

A user will be able to create a room and invite other users through a shareable invitation link.

The room will become the main boundary for:

* Collaborative code
* Project files
* Chat
* User presence
* Permissions
* Real-time events

---

# Real-Time Collaboration

The editor will use **WebSocket + STOMP** instead of repeatedly polling the server.

Conceptually:

```text
User A
   │
   │ Code change
   ▼
WebSocket
   │
   ▼
Spring Boot
   │
   │ Broadcast
   ├──────────────► User B
   │
   ├──────────────► User C
   │
   └──────────────► User D
```

This allows multiple users inside the same room to receive updates with low latency.

The synchronization layer will eventually handle:

* Code changes
* Cursor movement
* User presence
* Room messages
* File changes

---

# Project Structure

The backend follows a layered structure:

```text
src/
└── main/
    ├── java/
    │   └── Real_Time_Code_Editor/
    │       └── example/
    │           ├── Controller/
    │           ├── Service/
    │           ├── Repository/
    │           ├── Entity/
    │           ├── DTOs/
    │           ├── Security/
    │           └── Exception/
    │
    └── resources/
        └── application.properties
```

The project will gradually be organized into domain-oriented modules as more functionality is added.

---

# Getting Started

## Prerequisites

Make sure the following are installed:

* Java 21+
* Maven
* PostgreSQL
* Node.js
* npm
* Git

---

## Clone the Repository

```bash
git clone https://github.com/<your-username>/<your-repository>.git
cd <your-repository>
```

---

## Backend Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE collaborative_editor;
```

Configure the database connection in:

```text
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/collaborative_editor
spring.datasource.username=your_username
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

## Run the Backend

Using Maven:

```bash
./mvnw spring-boot:run
```

Or:

```bash
mvn spring-boot:run
```

The backend will run on:

```text
http://localhost:8080
```

---

# Testing

The REST APIs can be tested using **Postman**.

Authentication testing flow:

```text
1. Register user
       ↓
2. Login
       ↓
3. Copy JWT
       ↓
4. Send JWT as Bearer token
       ↓
5. Access /api/user/me
```

Example protected request:

```http
GET http://localhost:8080/api/user/me
Authorization: Bearer <JWT>
```

---

# Security

Current security implementation includes:

* BCrypt password hashing
* JWT authentication
* Stateless sessions
* Protected API endpoints
* Bearer token authentication
* Request validation

Sensitive configuration such as JWT secrets and database credentials should be provided through environment variables in production.

---

# Development Roadmap

### Phase 1 - Authentication

* [x] Registration
* [x] Login
* [x] BCrypt
* [x] JWT
* [x] JWT filter
* [x] Protected endpoints

### Phase 2 - Rooms

* [ ] Room entity
* [ ] Room creation
* [ ] Room membership
* [ ] Invite links
* [ ] Room permissions

### Phase 3 - Real-Time Editor

* [ ] WebSocket configuration
* [ ] STOMP messaging
* [ ] Real-time code updates
* [ ] Code synchronization
* [ ] Multi-file workspace

### Phase 4 - Collaboration

* [ ] Real-time chat
* [ ] Online presence
* [ ] Live cursors
* [ ] Editor/viewer permissions

### Phase 5 - Advanced Collaboration

* [ ] Collaborative whiteboard
* [ ] WebRTC voice communication
* [ ] Project persistence
* [ ] Improved synchronization

### Phase 6 - Deployment

* [ ] Dockerize application
* [ ] Production configuration
* [ ] Cloud deployment
* [ ] Monitoring and logging

---

# What I'm Learning

This project is being built to go beyond basic CRUD applications and understand how real-time collaborative systems work.

Key areas being explored:

* Spring Security
* JWT authentication
* REST API design
* WebSocket communication
* STOMP messaging
* Concurrent state updates
* Real-time synchronization
* Database modeling
* Authorization and RBAC
* React state management
* Distributed communication concepts
* Docker and deployment

---

# Future Improvements

Potential future improvements include:

* Operational Transformation or CRDT-based synchronization
* Better conflict resolution
* Version history
* Code execution sandbox
* Git integration
* File sharing
* Project-level permissions
* Notifications
* Activity history

These features will be evaluated after the core collaboration system is stable.

---

# Project Goals

The main goal of this project is not simply to build another code editor.

It is to understand how to design and implement a system where:

* Multiple users interact with the same state
* Changes are propagated in real time
* Authentication and authorization are enforced
* Persistent data is modeled correctly
* Concurrent operations are handled safely
* REST and WebSocket communication work together

The project will evolve incrementally, with each phase introducing a new engineering problem to solve.

---

## License

This project is currently developed as a personal learning and portfolio project.

License information will be added when the project is ready for public distribution.

---

## Author

**Jay Sahu**

Java Backend Developer | Spring Boot | React | PostgreSQL

Building and learning through real-world projects.
