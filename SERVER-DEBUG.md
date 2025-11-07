# Server Debugging Guide

## Check Container Logs

Run these commands on your server to diagnose the restarting container:

```bash
# View recent logs
docker logs khmer-calendar-api --tail 100

# Follow logs in real-time
docker logs khmer-calendar-api -f

# View all logs
docker logs khmer-calendar-api
```

## Common Issues and Fixes

### 1. Check Application Errors

```bash
# See what error is causing the restart
docker logs khmer-calendar-api 2>&1 | tail -50
```

### 2. Test Container Manually

```bash
# Stop the container
docker stop khmer-calendar-api
docker rm khmer-calendar-api

# Run interactively to see errors
docker run -it --rm \
  -p 3002:3002 \
  -e NODE_ENV=production \
  -e PORT=3002 \
  bookish-funicular-khmer-calendar-api
```

### 3. Check File Permissions

```bash
# Rebuild with no cache
cd ~/bookish-funicular
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### 4. Check Port Availability

```bash
# Check if port 3002 is available
netstat -tulpn | grep 3002
# or
lsof -i :3002
```

### 5. Verify Files Are Present

```bash
# Check if server.js exists in the image
docker run --rm bookish-funicular-khmer-calendar-api ls -la /app/

# Check if node_modules are installed
docker run --rm bookish-funicular-khmer-calendar-api ls -la /app/node_modules/
```

### 6. Run Shell Inside Container

```bash
# Start container with shell instead of node
docker run -it --rm \
  -p 3002:3002 \
  -e NODE_ENV=production \
  -e PORT=3002 \
  bookish-funicular-khmer-calendar-api sh

# Then inside container:
# ls -la
# node --version
# npm --version
# node server.js
```

## Quick Fix Commands

```bash
# Complete rebuild
cd ~/bookish-funicular
docker-compose down
docker rmi bookish-funicular-khmer-calendar-api
docker-compose build --no-cache
docker-compose up -d

# Check status
docker ps -a | grep khmer-calendar-api

# View logs
docker logs khmer-calendar-api
```

## Most Likely Issues

1. **Missing dependencies** - Check if package.json is copied correctly
2. **Port binding issue** - Container port 3002 might not be listening
3. **Application crash** - Check server.js for errors
4. **File permissions** - node user might not have access

## Share Logs

After running `docker logs khmer-calendar-api`, share the output to identify the exact issue.

