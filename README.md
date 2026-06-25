# Dockerised App Deployment

## Architecture

```text
Docker Compose Orchestration
            ↓
      AWS EC2 Hosting
            ↓
   Security & Hardening
            ↓
      Deployment Flow
```

---

# 1. Docker Compose Orchestration

The application is containerized using Docker and orchestrated with Docker Compose.

### Required Files

#### Dockerfile

A multi-stage Dockerfile is used to build the application and serve the production build using Nginx.

**Responsibilities:**

* Install dependencies
* Build the application
* Create a lightweight production image
* Serve static files using Nginx

#### docker-compose.yml

Docker Compose manages the application containers and networking.

**Responsibilities:**

* Build Docker images
* Start and stop containers
* Configure ports and environment variables
* Simplify deployment with a single command

#### nginx.conf

Nginx is configured to serve the production build generated during the Docker multi-stage build process.

**Responsibilities:**

* Serve static files
* Handle routing
* Reverse proxy configuration (if required)
* Improve application performance

---

# 2. Create and Connect AWS EC2 Instance

Launch an EC2 instance and connect to it using SSH.

### Install Docker and Docker Compose

```bash
sudo apt update

sudo apt install docker.io docker-compose -y
```

### Verify Installation

```bash
docker --version

docker-compose --version
```

### Start Docker Service

```bash
sudo systemctl enable docker

sudo systemctl start docker
```

---

# 3. Security & Hardening

Create a `bootstrap.sh` file to automate security configuration and system hardening.

### bootstrap.sh Responsibilities

* Update system packages
* Configure firewall rules
* Enable Docker service
* Apply basic server hardening
* Prepare the server for deployment

### Execute Bootstrap Script

```bash
bash bootstrap.sh
```

This ensures the EC2 instance is configured consistently and securely before deployment.

---

# 4. Deployment Flow

### Deploy EC2 Instance

* Launch an AWS EC2 instance
* Configure Security Groups
* Connect using SSH
* Install Docker and Docker Compose


```
