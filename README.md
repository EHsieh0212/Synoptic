# Synoptic

## Local Development
### Method1: docker-compose
```
docker-compose -f docker-compose.docker.yml up
```
### Method2: local terminal
```
docker-compose -f docker-compose.local.yml up -d
cd server
npm run develop-whole
```