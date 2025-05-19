pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'travel-app'
        CONTAINER_NAME = 'travel-app-container'
        APP_PORT = 3000
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo "Starting pipeline on ${new Date()}"
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} .'
                sh 'docker tag ${DOCKER_IMAGE}:${BUILD_NUMBER} ${DOCKER_IMAGE}:latest'
                echo "Docker image built: ${DOCKER_IMAGE}:${BUILD_NUMBER}"
            }
        }
        
        stage('Stop Previous Container') {
            steps {
                script {
                    echo "Stopping previous container if it exists..."
                    sh 'docker stop ${CONTAINER_NAME} || true'
                    sh 'docker rm ${CONTAINER_NAME} || true'
                }
            }
        }
        
        stage('Run Container') {
            steps {
                echo "Starting container on port ${APP_PORT}..."
                sh 'docker run -d -p ${APP_PORT}:${APP_PORT} --name ${CONTAINER_NAME} ${DOCKER_IMAGE}:latest'
            }
        }
        
        stage('Test Application') {
            steps {
                script {
                    echo "Waiting for application to start..."
                    sh 'sleep 5'
                    
                    echo "Testing /travel endpoint..."
                    def response = sh(script: 'curl -s http://localhost:${APP_PORT}/travel', returnStdout: true).trim()
                    echo "Response from /travel endpoint: ${response}"
                    
                    if (!response.contains('место для путешествий')) {
                        error "Endpoint /travel не возвращает ожидаемый результат"
                    }
                    echo "Test passed!"
                }
            }
        }
    }
    
    post {
        success {
            echo "Pipeline completed successfully on ${new Date()}"
        }
        failure {
            echo "Pipeline failed on ${new Date()}"
            sh 'docker stop ${CONTAINER_NAME} || true'
            sh 'docker rm ${CONTAINER_NAME} || true'
        }
    }
}
