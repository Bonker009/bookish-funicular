# Fix for Server - Missing dotenv Module

## Problem
The container is restarting because `dotenv` module is not found.

## Solution

Run these commands on your server:

```bash
cd ~/bookish-funicular

# Stop and remove the container
docker-compose down

# Remove the old image
docker rmi bookish-funicular-khmer-calendar-api

# Rebuild with no cache to ensure fresh install
docker-compose build --no-cache

# Start the container
docker-compose up -d

# Check logs to verify it's working
docker logs khmer-calendar-api -f
```

## Alternative: Verify Installation

If the above doesn't work, verify the installation:

```bash
# Build and test interactively
docker build -t khmer-calendar-api-test .

# Run with shell to check
docker run -it --rm khmer-calendar-api-test sh

# Inside container, check:
ls -la node_modules/ | grep dotenv
npm list dotenv
node -e "require('dotenv')"
```

## Quick Fix Script

Create a file `rebuild.sh` on your server:

```bash
#!/bin/bash
cd ~/bookish-funicular
docker-compose down
docker rmi bookish-funicular-khmer-calendar-api 2>/dev/null
docker-compose build --no-cache
docker-compose up -d
docker logs khmer-calendar-api -f
```

Make it executable and run:
```bash
chmod +x rebuild.sh
./rebuild.sh
```

## Expected Output

After rebuilding, you should see in the logs:
```
🚀 Khmer Calendar API server is running on port 3002
📍 Access the API at http://localhost:3002
📖 API documentation: http://localhost:3002/
🏗️  Architecture: Clean Architecture
```

## Verify It's Working

```bash
# Check container status
docker ps | grep khmer-calendar-api

# Test the API
curl http://localhost:3002/api/health
```

