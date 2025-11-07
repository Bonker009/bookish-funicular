# Port Configuration Guide

## Current Port Assignments

| Service | Container Port | Host Port | Status |
|---------|---------------|-----------|--------|
| Khmer Calendar API | 3000 | 3002 | ✅ Available |
| app-endpoint | 3000 | 3001 | ✅ Running |
| API Gateway | 9090 | 9090 | ✅ Running |
| Enterprise Service | 9092 | 9092 | ✅ Running |
| Kafka | 9092 | 9093 | ✅ Running |
| PostgreSQL (Enterprise) | 5432 | 5435 | ✅ Running |
| PostgreSQL (Application) | 5432 | 5438 | ✅ Running |
| Redis | 6379 | 6380 | ✅ Running |
| Zookeeper | 2181 | 2181 | ✅ Running |

## Access URLs

- **Khmer Calendar API**: http://localhost:3002
- **app-endpoint**: http://localhost:3001
- **API Gateway**: http://localhost:9090
- **Enterprise Service**: http://localhost:9092

## Port Management

### Change Khmer Calendar API Port

If you need to change the port, edit `docker-compose.yml`:

```yaml
ports:
  - "YOUR_PORT:3000"  # Change YOUR_PORT to desired port
```

### Check Port Availability

```bash
# Check if a port is in use
lsof -i :PORT_NUMBER

# Or using netstat
netstat -tulpn | grep PORT_NUMBER

# Or using Docker
docker ps | grep PORT_NUMBER
```

### Recommended Port Ranges

- **3000-3009**: Node.js applications
- **9090-9099**: API Gateways and Services
- **5432-5439**: PostgreSQL databases
- **6379-6389**: Redis instances
- **2181-2189**: Zookeeper
- **9092-9099**: Kafka

## Multiple Node.js Projects

If you need to run multiple Node.js projects:

1. **Use different host ports** (as currently configured):
   - Project 1: 3001
   - Project 2: 3002
   - Project 3: 3003
   - etc.

2. **Use environment variables** in docker-compose.yml:
   ```yaml
   ports:
     - "${KHMER_API_PORT:-3002}:3000"
   ```

3. **Create separate docker-compose files**:
   - `docker-compose.khmer-api.yml`
   - `docker-compose.app-endpoint.yml`
   - etc.

## Quick Commands

```bash
# View all running containers and their ports
docker ps --format "table {{.Names}}\t{{.Ports}}"

# Check specific port
lsof -i :3002

# Stop Khmer Calendar API
docker-compose down

# Start Khmer Calendar API
docker-compose up -d

# Restart all services
docker-compose restart
```

