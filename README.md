# CI/CD GitHub Actions Demo

This is a small Node.js HTTP application created for a GitHub Actions CI/CD pipeline demo.

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
docker build -t ci-cd-github-actions-demo .
docker run --rm -p 3000:3000 ci-cd-github-actions-demo
```

## GitHub Actions Pipeline

The workflow file is located at:

```text
.github/workflows/ci-cd.yml
```

It runs automatically when code is pushed to the `main` branch. It can also be started manually from the GitHub Actions tab.

The pipeline has these stages:

1. Fetch from GitHub
2. Build Application
3. Create Docker Image
4. Push Image to Docker Hub

## Docker Hub Secrets

Before running the workflow, add these repository secrets in GitHub:

- `DOCKERHUB_USERNAME`: your Docker Hub username
- `DOCKERHUB_TOKEN`: your Docker Hub access token

The Docker image name used by the pipeline is:

```text
kazz004/ci-cd-github-actions-demo
```

## GitHub Secrets Setup

Open the repository on GitHub and go to:

```text
Settings -> Secrets and variables -> Actions -> New repository secret
```

Add both Docker Hub secrets there. After that, every push to `main` will test the app, build the Docker image, and push it to Docker Hub.
