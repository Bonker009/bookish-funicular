# Troubleshooting Guide

## Container Restarting Issue

If your container is in a restart loop, follow these steps:

### 1. Check Container Logs

```bash
docker logs khmer-calendar-api
```

Or with more details:
```bash
docker logs khmer-calendar-api --tail 100 -f
```

### 2. Check Port Conflicts

**On Linux/Mac:**
```bash
lsof -i :3000
# or
netstat -tulpn | grep 3000
```

**On Windows:**
```powershell
netstat -ano | findstr :3000
```

**Using Docker:**
```bash
docker ps | grep 3000
```

### 3. Solutions

#### Solution A: Use Alternative Port (Recommended)

The default docker-compose.yml now uses port **3002** to avoid conflicts:

```bash
docker-compose up -d
```

Access the API at: `http://localhost:3002`

#### Solution B: Change Port Manually

Edit `docker-compose.yml` and change:
```yaml
ports:
  - "YOUR_PORT:3000"  # Change YOUR_PORT to any available port
```

Then rebuild:
```bash
docker-compose down
docker-compose up -d --build
```

#### Solution C: Stop Conflicting Service

If port 3000 is in use by another service:
```bash
# Find the process
lsof -i :3000

# Kill the process (replace PID with actual process ID)
kill -9 PID
```

### 4. Common Issues

#### Issue: Permission Denied

**Fix:** The Dockerfile now includes proper permission handling. Rebuild:
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

#### Issue: Module Not Found

**Fix:** Ensure all dependencies are installed:
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

#### Issue: Container Exits Immediately

**Check logs:**
```bash
docker logs khmer-calendar-api
```

**Common causes:**
- Missing environment variables
- Application crash on startup
- Port already in use
- File permission issues

### 5. Debug Mode

Run container interactively to debug:
```bash
docker run -it --rm \
  -p 3002:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  khmer-calendar-api sh
```

Then inside the container:
```bash
node server.js
```

### 6. Clean Rebuild

If nothing works, do a complete clean rebuild:

```bash
# Stop and remove containers
docker-compose down

# Remove the image
docker rmi bookish-funicular-khmer-calendar-api

# Remove build cache
docker builder prune

# Rebuild from scratch
docker-compose build --no-cache

# Start fresh
docker-compose up -d
```

### 7. Verify Container Status

```bash
# Check container status
docker ps -a | grep khmer-calendar-api

# Check if port is listening
docker port khmer-calendar-api

# Test the API
curl http://localhost:3002/api/health
```

### 8. Port Mapping Reference

- **Container Port:** 3000 (internal, always 3000)
- **Host Port:** 3002 (external, can be changed)
- **Access URL:** `http://localhost:3002`

## Quick Fix Commands

```bash
# Stop the container
docker-compose down

# Rebuild with no cache
docker-compose build --no-cache

# Start with logs visible
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f khmer-calendar-api
```

