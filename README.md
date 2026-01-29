# Docker Setup

This branch adds Docker support to the Job Application Tracker.

## Differences from `main`
- Dockerfile
- docker-compose.yml
- Environment variables via Docker

## Run
```bash
docker build -t job-tracker
docker run -d -p 3000:3000 --env-file .env.local job-tracker
```
