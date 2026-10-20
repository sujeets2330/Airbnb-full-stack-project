# Wanderlust — Inspired by Airbnb

A **Full-Stack Web Application with DevOps Integration**, inspired by Airbnb.

Wanderlust is a property listing and review platform where users can browse accommodation listings, view locations on interactive maps, create and manage listings, write reviews, and securely manage their accounts.

The application was developed using **Node.js, Express.js, MongoDB, EJS, and JavaScript**, and containerized and deployed using **Docker, Jenkins CI/CD, and a Linux server**.

### Live Application

https://airbnb-full-stack-project-z8xi.onrender.com/listings

---

## Table of Contents

- [Project Overview](#project-overview)
- [Application Architecture](#application-architecture)
- [Technologies Used](#technologies-used)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Database](#database)
  - [Authentication](#authentication)
  - [Image Storage](#image-storage)
  - [Maps](#maps)
  - [Validation](#validation)
  - [File Uploads](#file-uploads)
- [DevOps and Deployment](#devops-and-deployment)
  - [Git and GitHub](#git-and-github)
  - [Linux Server](#linux-server)
  - [Docker](#docker)
  - [Jenkins CI/CD](#jenkins-cicd)
  - [Docker Image Security](#docker-image-security)
  - [Environment Variables](#environment-variables)
- [Key Features](#key-features)
- [Application Workflow](#application-workflow)
- [CI/CD Pipeline Workflow](#cicd-pipeline-workflow)
- [Challenges and Solutions](#challenges-and-solutions)
- [Project Setup](#project-setup)
- [Author](#author)

---

# Project Overview

Wanderlust is a full-stack web application inspired by Airbnb.

The application allows users to:

- Register and log in securely
- Browse available property listings
- View detailed information about properties
- Create new listings
- Edit and delete their own listings
- Upload property images
- View property locations using interactive maps
- Add and delete reviews
- Manage their account and password
- Maintain authenticated sessions

Along with application development, I implemented a basic **DevOps workflow** to automate application deployment.

The project uses:

**Development → GitHub → Jenkins → Docker Build → Security Scan → Deployment → Running Container**

---

# Application Architecture

```text
                    ┌──────────────────┐
                    │      User        │
                    │     Browser      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  Wanderlust App  │
                    │  Node.js/Express │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
        ┌──────────┐   ┌───────────┐  ┌───────────┐
        │ MongoDB  │   │ Cloudinary│  │  Mapbox   │
        │  Atlas   │   │   Images  │  │   Maps    │
        └──────────┘   └───────────┘  └───────────┘


                    DevOps Workflow

        ┌──────────┐
        │  GitHub  │
        └────┬─────┘
             │
             ▼
        ┌──────────┐
        │ Jenkins  │
        └────┬─────┘
             │
             ▼
      ┌───────────────┐
      │ Docker Build  │
      └───────┬───────┘
              │
              ▼
      ┌───────────────┐
      │ Trivy Security│
      │     Scan      │
      └───────┬───────┘
              │
              ▼
      ┌───────────────┐
      │ Docker Image  │
      └───────┬───────┘
              │
              ▼
      ┌───────────────┐
      │ Linux Server  │
      │ Docker Engine │
      └───────┬───────┘
              │
              ▼
      ┌───────────────┐
      │   Container   │
      │   Wanderlust  │
      └───────────────┘
```

---

# Technologies Used

## Backend

- **Node.js** — JavaScript runtime used for server-side development
- **Express.js** — Backend web framework
- **Mongoose** — MongoDB object modeling
- **RESTful routing** — Used for handling application operations
- **Dotenv** — Environment variable management

## Frontend

- **EJS** — Server-side templating engine
- **HTML5**
- **CSS3**
- **JavaScript**
- **Bootstrap**

## Database

- **MongoDB**
- **MongoDB Atlas**
- **Mongoose**

MongoDB is used to store:

- User information
- Property listings
- Reviews
- Listing metadata
- Location information

## Authentication

Authentication is implemented using:

- **Passport.js**
- **Passport Local**
- **Passport Local Mongoose**
- Session-based authentication
- Password hashing

The application protects authenticated routes and ensures users can manage resources according to their authorization.

## Image Storage

**Cloudinary** is used for storing and managing property images.

Instead of storing large image files directly inside the application server, images are uploaded to Cloudinary and their references are stored with the listing.

## Maps

**Mapbox** is used to provide interactive location visualization for property listings.

The application converts listing location information into map coordinates and displays the location on an interactive map.

## Session Management

The application uses:

- **Express Session**
- **Connect Mongo**
- **Connect Flash**
- **Cookie Parser**

MongoDB is used as the persistent session store.

## Validation

**Joi** is used for server-side validation of incoming application data.

This helps prevent invalid or incomplete data from being stored in the database.

## File Uploads

**Multer** is used to handle multipart/form-data and process image uploads before sending them to Cloudinary.

---

# DevOps and Deployment

One of the important additions to this project was implementing a basic **DevOps workflow** around the application.

The objective was to make the application easier to build, test, containerize, scan, and deploy consistently.

The main DevOps technologies used are:

- Linux
- Git
- GitHub
- Docker
- Jenkins
- Trivy
- Environment Variables
- CI/CD Pipeline

---

# Git and GitHub

Git is used for source-code version control.

The project source code is maintained in GitHub:

https://github.com/sujeets2330/Airbnb-full-stack-project

The repository contains:

```text
Application Source Code
        │
        ├── Backend
        ├── Frontend
        ├── Models
        ├── Routes
        ├── Controllers
        ├── Views
        ├── Public Assets
        ├── Dockerfile
        ├── Jenkinsfile
        └── package.json
```

GitHub acts as the source-code repository from which Jenkins obtains the latest application code.

---

# Linux Server

The application deployment environment uses a **Linux server**.

Linux is used as the server-level environment for:

- Running Docker
- Managing application processes
- Managing files and permissions
- Checking system resources
- Viewing logs
- Managing services
- Troubleshooting deployment issues

Common Linux commands used during deployment and troubleshooting include:

```bash
ls
cd
pwd
chmod
ps
top
df -h
free -h
systemctl
journalctl
grep
```

For example, running processes can be checked using:

```bash
ps aux
```

Disk usage can be checked using:

```bash
df -h
```

System and service logs can be investigated using:

```bash
journalctl
```

---

# Docker

Docker is used to **containerize the Wanderlust application**.

Instead of installing and configuring all application dependencies directly on the server, the application and its runtime dependencies are packaged into a Docker image.

### Docker workflow

```text
Application Code
       │
       ▼
   Dockerfile
       │
       ▼
  Docker Image
       │
       ▼
 Docker Container
       │
       ▼
 Running Application
```

### Dockerfile

The Dockerfile defines how the application image is created.

A simplified structure is:

```dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "app.js"]
```

The image can be built using:

```bash
docker build -t wanderlust .
```

The container can then be started using:

```bash
docker run -d -p 8080:8080 --name wanderlust wanderlust
```

### Why Docker?

Docker provides:

- Consistent runtime environment
- Dependency isolation
- Easier deployment
- Portable application packaging
- Reproducible builds
- Easier rollback and redeployment

---

# Jenkins CI/CD

Jenkins is used to automate the application's build and deployment workflow.

Instead of manually performing every deployment step, Jenkins executes the pipeline automatically.

The pipeline follows the general workflow:

```text
Developer
    │
    ▼
  GitHub
    │
    ▼
  Jenkins
    │
    ├── Checkout Source Code
    │
    ├── Build Docker Image
    │
    ├── Security Scan
    │
    ├── Stop Existing Container
    │
    ├── Start New Container
    │
    └── Verify Deployment
         │
         ▼
   Running Application
```

The pipeline is defined using a `Jenkinsfile`.

A parameter is also used to optionally execute the security scan:

```groovy
parameters {
    booleanParam(
        name: 'RUN_SECURITY_SCAN',
        defaultValue: false,
        description: 'Run Trivy Docker image vulnerability scan'
    )
}
```

The Docker image used by the pipeline is:

```text
wanderlust
```

The deployment process can therefore be repeated consistently whenever a new version of the application needs to be deployed.

---

# Docker Image Security

**Trivy** is integrated into the CI/CD workflow as an optional Docker image vulnerability scanner.

After building the Docker image, Trivy can scan the image for known vulnerabilities.

Example:

```bash
trivy image wanderlust
```

The purpose of this step is to identify security vulnerabilities in:

- Base images
- Operating-system packages
- Application dependencies
- Known vulnerable components

The security scan can be enabled through the Jenkins pipeline parameter:

```text
RUN_SECURITY_SCAN
```

This provides an additional security check before deployment.

---

# Environment Variables

Sensitive configuration values are not hard-coded into the application source code.

Environment variables are used for configuration such as:

```text
CLOUD_NAME
CLOUD_API_KEY
CLOUD_API_SECRET

MAP_TOKEN

ATLASDB_URL

SECRET
```

These values are used for:

- MongoDB Atlas connection
- Cloudinary authentication
- Mapbox configuration
- Session security
- Application secrets

The `.env` file should never be committed to GitHub.

Example:

```env
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret

MAP_TOKEN=your_mapbox_token

ATLASDB_URL=your_mongodb_connection_string

SECRET=your_application_secret
```

---

# Key Features

## User Authentication

Users can:

- Register
- Login
- Logout
- Maintain authenticated sessions
- Update account information
- Update passwords

Authentication is implemented using Passport.js and session-based authentication.

## Listing Management

Authenticated users can:

- Create listings
- View listings
- Edit listings
- Delete listings

Each listing can contain:

- Title
- Description
- Price
- Location
- Country
- Property image
- Map location

## Review System

Users can:

- Add reviews
- View reviews
- Delete reviews where authorized

Reviews are associated with their respective listings.

## Image Upload

Users can upload property images.

The flow is:

```text
User
 │
 ▼
Multer
 │
 ▼
Cloudinary
 │
 ▼
Image URL
 │
 ▼
MongoDB Listing
```

## Interactive Maps

Mapbox is used to display the geographic location of each property.

The listing's location is converted into coordinates and displayed through the map interface.

---

# Application Workflow

A typical user flow is:

```text
User Opens Application
        │
        ▼
Browse Listings
        │
        ▼
Open Listing
        │
        ├──────────────► View Images
        │
        ├──────────────► View Details
        │
        ├──────────────► View Map
        │
        └──────────────► View Reviews
                         │
                         ▼
                  Login / Register
                         │
                         ▼
                  Create Listing
                         │
                         ▼
                   Upload Image
                         │
                         ▼
                    Add Details
                         │
                         ▼
                    Save Listing
                         │
                         ▼
                  MongoDB + Cloudinary
```

---

# CI/CD Pipeline Workflow

The DevOps workflow can be summarized as:

### 1. Source Code

The developer pushes application changes to GitHub.

```bash
git add .
git commit -m "Update application"
git push
```

### 2. Jenkins

Jenkins retrieves the latest source code from the repository.

### 3. Build

Jenkins builds the Docker image:

```bash
docker build -t wanderlust .
```

### 4. Security Scan

If enabled, Trivy scans the generated image:

```bash
trivy image wanderlust
```

### 5. Container Deployment

The existing application container is replaced with the newly built version.

```text
Old Container
      │
      ▼
   Stop/Remove
      │
      ▼
New Docker Image
      │
      ▼
New Container
      │
      ▼
Running Application
```

### 6. Application

The new version becomes available through the configured application URL.

This workflow reduces manual deployment steps and provides a repeatable deployment process.

---

# Challenges and Solutions

## 1. Managing User Authentication

### Challenge

The application needed secure login, logout, session management, and authorization.

### Solution

Passport.js was integrated with session-based authentication and password hashing.

---

## 2. Image Storage

### Challenge

Storing large images directly on the application server would increase storage requirements and complicate deployment.

### Solution

Cloudinary was used as external image storage, while the application stores the corresponding image information.

---

## 3. Location Visualization

### Challenge

Listings needed a way to visually represent their geographic location.

### Solution

Mapbox was integrated to provide interactive maps using listing location information.

---

## 4. Application Deployment

### Challenge

Manually installing dependencies and configuring the application for every deployment can lead to inconsistent environments.

### Solution

Docker was used to package the application and its dependencies into a consistent containerized environment.

---

## 5. Deployment Automation

### Challenge

Manually building and deploying a new version after every code change is time-consuming and error-prone.

### Solution

Jenkins was used to automate the CI/CD workflow for building the Docker image and deploying the application.

---

## 6. Container Security

### Challenge

Container images may contain vulnerable operating-system packages or dependencies.

### Solution

Trivy was integrated into the Jenkins pipeline as an optional vulnerability-scanning stage.

---

## 7. Server-Level Troubleshooting

### Challenge

Applications running on Linux servers can encounter issues related to permissions, processes, disk usage, memory, services, or logs.

### Solution

Linux administration commands were used to investigate:

```bash
ps
top
df -h
free -h
systemctl
journalctl
grep
chmod
```

This provides visibility into the server and application environment during deployment and troubleshooting.

---

# Project Setup

## 1. Clone Repository

```bash
git clone https://github.com/sujeets2330/Airbnb-full-stack-project.git

cd Airbnb-full-stack-project
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret

MAP_TOKEN=your_mapbox_token

ATLASDB_URL=your_mongodb_connection_string

SECRET=your_secret_key
```

## 4. Run Locally

```bash
node app.js
```

The application runs on:

```text
http://localhost:8080/listings
```

---

# Running with Docker

Build the Docker image:

```bash
docker build -t wanderlust .
```

Run the container:

```bash
docker run -d \
  --name wanderlust \
  -p 8080:8080 \
  wanderlust
```

Check running containers:

```bash
docker ps
```

View application logs:

```bash
docker logs wanderlust
```

Stop the container:

```bash
docker stop wanderlust
```

Remove the container:

```bash
docker rm wanderlust
```

---

# DevOps Skills Demonstrated

Through this project, I gained practical experience with:

- Linux server administration
- Git and GitHub
- Docker
- Dockerfile
- Docker images
- Docker containers
- Jenkins
- CI/CD pipelines
- Trivy container security scanning
- Environment variables
- Application deployment
- Server-level troubleshooting
- Application logging
- Process management
- Basic infrastructure troubleshooting

---

# Project Highlights

### Full-Stack Development

Built a complete web application with:

```text
Frontend
   ↓
Express.js
   ↓
Node.js
   ↓
MongoDB
```

### Cloud Integrations

Integrated:

- MongoDB Atlas
- Cloudinary
- Mapbox

### DevOps

Implemented:

```text
GitHub
   ↓
Jenkins
   ↓
Docker Build
   ↓
Trivy Scan
   ↓
Docker Container
   ↓
Linux Server
```

This project gave me practical exposure to both **application development and deployment automation**, allowing me to understand how a full-stack application moves from source code to a running production environment.

---

# Author

**Sujeet M A**

LinkedIn:  
https://www.linkedin.com/in/sujeet-m-a-39a86b2b9/

Email:  
sujeetmalagundi999@gmail.com

---

# License

This project is created for educational and portfolio purposes.

---

# Thank You

Thank you for exploring **Wanderlust**.
