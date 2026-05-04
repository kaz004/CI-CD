# CI/CD Jenkins Demo

This is a small Node.js HTTP application created for a Jenkins pipeline demo.

## Local Run

```bash
npm test
npm start
```

Open:

- `http://localhost:3000/`
- `http://localhost:3000/health`

## Docker Run

```bash
docker build -t ci-cd-jenkins-demo .
docker run --rm -p 3000:3000 ci-cd-jenkins-demo
```

## Jenkins Pipeline

The `Jenkinsfile` has these stages:

1. Fetch from GitHub
2. Build Application
3. Create Docker Image
4. Push Image to Docker Hub

Before running the Jenkins job:

- Install Docker on the Jenkins agent.
- Create a Jenkins pipeline job that uses this repository.
- Create a Jenkins credential:

- Kind: `Username with password`
- ID: `dockerhub-credentials`
- Username: your Docker Hub username
- Password: Docker Hub access token

The Docker image name used by the pipeline is:

```text
kaz004/ci-cd-jenkins-demo
```
