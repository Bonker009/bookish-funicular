# Docker Setup Guide

This guide explains how to run the Cambodia Khmer Calendar API using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose installed (usually comes with Docker Desktop)

## Quick Start

### Production Mode

Build and run the API in production mode:

```bash
docker-compose up -d
```

The API will be available at `http://localhost:3000`

### Development Mode

For development with hot-reload:

```bash
docker-compose -f docker-compose.dev.yml up
```

## Docker Commands

### Build the image

```bash
docker build -t khmer-calendar-api .
```

### Run the container

```bash
docker run -p 3000:3000 khmer-calendar-api
```

### Using Docker Compose

**Start services:**
```bash
docker-compose up -d
```

**Stop services:**
```bash
docker-compose down
```

**View logs:**
```bash
docker-compose logs -f
```

**Rebuild after changes:**
```bash
docker-compose up -d --build
```

## Environment Variables

You can set environment variables in `docker-compose.yml` or create a `.env` file:

```env
PORT=3000
NODE_ENV=production
```

## Health Check

The container includes a health check that verifies the API is running:

```bash
docker ps
```

You should see `healthy` status after the container starts.

## Troubleshooting

### Port already in use

If port 3000 is already in use, change it in `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"
```

### View container logs

```bash
docker-compose logs khmer-calendar-api
```

### Access container shell

```bash
docker-compose exec khmer-calendar-api sh
```

### Rebuild from scratch

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## Production Deployment

For production deployment:

1. Build the image:
```bash
docker build -t khmer-calendar-api:latest .
```

2. Tag for registry:
```bash
docker tag khmer-calendar-api:latest your-registry/khmer-calendar-api:latest
```

3. Push to registry:
```bash
docker push your-registry/khmer-calendar-api:latest
```

4. Deploy using docker-compose or Kubernetes

## File Structure

- `Dockerfile` - Production Docker image
- `Dockerfile.dev` - Development Docker image with nodemon
- `docker-compose.yml` - Production compose configuration
- `docker-compose.dev.yml` - Development compose configuration
- `.dockerignore` - Files to exclude from Docker build

