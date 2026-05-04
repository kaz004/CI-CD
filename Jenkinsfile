pipeline {
    agent any

    environment {
        APP_NAME = 'ci-cd-jenkins-demo'
        DOCKERHUB_REPO = 'kazz004/ci-cd-jenkins-demo'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Fetch from GitHub') {
            steps {
                git branch: 'main', url: 'https://github.com/kaz004/CI-CD.git'
            }
        }

        stage('Build Application') {
            steps {
                sh 'docker run --rm -v "$PWD":/app -w /app node:22-alpine npm test'
            }
        }

        stage('Create Docker Image') {
            steps {
                sh 'docker build -t $DOCKERHUB_REPO:$IMAGE_TAG -t $DOCKERHUB_REPO:latest .'
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_TOKEN')]) {
                    sh '''
                        echo "$DOCKERHUB_TOKEN" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin
                        docker push $DOCKERHUB_REPO:$IMAGE_TAG
                        docker push $DOCKERHUB_REPO:latest
                    '''
                }
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
        }
    }
}
